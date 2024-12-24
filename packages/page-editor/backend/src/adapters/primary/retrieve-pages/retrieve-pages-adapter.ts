import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import { ReturnPageDto } from "@dto/page/page"
import Responses from "@utils/api-responses"
import { retrievePagesUseCase } from "@use-cases/retrieve-pages"

export async function retrievePagesHandler({ pathParameters }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		if (!pathParameters || !pathParameters?.origin) throw new ValidationError("no id in the path parameters of the event")

		const { origin } = pathParameters

		console.log(`creator: ${origin} requested pages`)

		const pages: ReturnPageDto[] = await retrievePagesUseCase(origin as string)

		console.log(`pages fetched: ${JSON.stringify(pages)}`)

		return Responses._200(pages)
	} catch (error) {
		return errorHandler(error)
	}
}
