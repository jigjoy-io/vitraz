import { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand } from "@aws-sdk/client-cognito-identity-provider"

const cognito = new CognitoIdentityProviderClient()

export async function postAuthenticationHandler(event: any) {
	if (event.request.userAttributes.email_verified !== "true") {
		const updateAttributesCommand = new AdminUpdateUserAttributesCommand({
			UserPoolId: event.userPoolId,
			Username: event.userName!,
			UserAttributes: [
				{
					Name: "email_verified",
					Value: "true",
				},
			],
		})
		await cognito.send(updateAttributesCommand)
	}
	return event
}
