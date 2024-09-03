import { ReturnPageDto } from "@dto/page"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import { removePageUseCase } from "@use-cases/remove-page"
import Responses from "@utils/api-responses"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export async function removePageHandler({
    pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        if (!pathParameters || !pathParameters?.id)
            throw new ValidationError('no id in the path parameters of the event')

        const { id } = pathParameters

        console.log(`reqiested page: ${id}`)

        const page: ReturnPageDto = await removePageUseCase(id)

        console.log(`page fetched: ${JSON.stringify(page)}`)

		return Responses._202(page)

    } catch (error) {
        return errorHandler(error)
    }
}