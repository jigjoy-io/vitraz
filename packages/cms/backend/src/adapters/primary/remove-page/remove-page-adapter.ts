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

        console.log(`Page to delete: ${id}`)

        await removePageUseCase(id)

        console.log(`Page deleted: ${JSON.stringify(id)}`)

		return Responses._200(id)

    } catch (error) {
        return errorHandler(error)
    }
}