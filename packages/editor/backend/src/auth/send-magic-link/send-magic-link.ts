import { SignInDto } from "@dto/sign-in"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import { schemaValidator } from "@packages/schema-validator"
import { schema } from "@schemas/sign-in.schema"
import Responses from "@utils/api-responses"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import {
	CognitoIdentityProviderClient,
	AdminGetUserCommand,
	AdminCreateUserCommand,
	AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

const ses = new SESClient()

const cognito = new CognitoIdentityProviderClient()

const { SES_FROM_ADDRESS, USER_POOL_ID, BASE_URL } = process.env
const ONE_MIN = 60 * 1000
const TIMEOUT_MINS = 5

import { encrypt } from "@utils/encription"
import { escape } from "querystring"

export async function sendMagicLinkHandler({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		if (!body) throw new ValidationError("No page body")

		const user: SignInDto = JSON.parse(body)
		const email = user.email

		schemaValidator(schema, user)

		console.log(`user: ${JSON.stringify(user)}`)

		try {
			const getUserCommand = new AdminGetUserCommand({
				Username: email,
				UserPoolId: USER_POOL_ID as string,
			})
			await cognito.send(getUserCommand)
		} catch (error: any) {
			switch (error.name) {
				case "UserNotFoundException":
					const createUserCommand = new AdminCreateUserCommand({
						Username: email,
						UserPoolId: USER_POOL_ID as string,
						MessageAction: "SUPPRESS",
					})
					await cognito.send(createUserCommand)
					break
			}
		}

		// only send the magic link on the first attempt
		const now = new Date()
		const expiration = new Date(now.getTime() + ONE_MIN * TIMEOUT_MINS)
		const payload = {
			email,
			expiration: expiration.toJSON(),
		}
		const tokenRaw = await encrypt(JSON.stringify(payload))
		const tokenB64 = Buffer.from(tokenRaw).toString("base64")
		const token = escape(tokenB64)
		const magicLink = `${BASE_URL}/interactive-content-designer?email=${email}&token=${token}`

		const updateAttributesCommand = new AdminUpdateUserAttributesCommand({
			UserPoolId: USER_POOL_ID as string,
			Username: email,
			UserAttributes: [
				{
					Name: "custom:authChallenge",
					Value: tokenB64,
				},
			],
		})
		await cognito.send(updateAttributesCommand)

		let response = {
			statusCode: 202,
		}

		await sendEmail(email, magicLink)
		return Responses._202(response)
	} catch (error) {
		return errorHandler(error)
	}
}

interface IEmail {
	getSubject(): string
	getBody(magicLink: string, timeoutMins: number): string
}

class Email implements IEmail {
	getSubject(): string {
		return "JigJoy Login Link"
	}

	getBody(magicLink: string, timeoutMins: number): string {
		return `<html><body><p>This is your one-time sign in link (it will expire in ${timeoutMins} mins):</p>
				<a href="${magicLink}" target="_blank">link</a></body></html>`
	}
}

async function sendEmail(emailAddress: string, magicLink: string) {
	const email: IEmail = new Email()

	const command = new SendEmailCommand({
		Destination: {
			ToAddresses: [emailAddress],
		},
		Message: {
			Subject: { Data: email.getSubject() },
			Body: {
				Html: { Data: email.getBody(magicLink, TIMEOUT_MINS) },
			},
		},
		Source: SES_FROM_ADDRESS,
	})

	try {
		let response = await ses.send(command)
		// process data.
		return response
	} catch (error) {
		console.log(error)
		// error handling.
		return error
	}
}
