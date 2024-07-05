import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ValidationError } from '@errors/validation-error'
import { errorHandler } from '@packages/apigw-error-handler'
import { ReturnPageDto } from '@dto/page/page'
import { retrievePageUseCase } from '@use-cases/retrieve-page'
import { EnvironmentType } from '@models/types'

/**
 * Handles the API Gateway event to get a specific page based on the provided ID.
 * @param {APIGatewayProxyEvent} event - The API Gateway event object containing path parameters.
 * @returns {Promise<APIGatewayProxyResult>} A promise that resolves to an APIGatewayProxyResult.
 */
export async function retrievePageHandler({
    pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        if (!pathParameters || !pathParameters?.id)
            throw new ValidationError('no id in the path parameters of the event')

        const { id } = pathParameters

        console.log(`reqiested page: ${id}`)

        const page: ReturnPageDto = await retrievePageUseCase(id, EnvironmentType.Development)

        console.log(`page fetched: ${JSON.stringify(page)}`)

        return {
            statusCode: 200,
            body: JSON.stringify(page),
        }

    } catch (error) {
        return errorHandler(error)
    }
}