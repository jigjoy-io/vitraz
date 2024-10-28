import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import { ReturnPageDto } from "@dto/page/page"
import Responses from "@utils/api-responses"
import { retrievePageUseCase } from "@use-cases/retrieve-page"

export async function retrievePageHandler({ pathParameters }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		if (!pathParameters || !pathParameters?.id) throw new ValidationError("no id in the path parameters of the event")

		const { id } = pathParameters

		console.log(`reqested page: ${id}`)

		const page: ReturnPageDto = await retrievePageUseCase(id)

		console.log(`page fetched: ${JSON.stringify(page)}`)

		return Responses._200(page)
	} catch (error) {
		return errorHandler(error)
	}
}
