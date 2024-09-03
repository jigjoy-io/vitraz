import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ValidationError } from '@errors/validation-error'
import { errorHandler } from '@packages/apigw-error-handler'
import { ReturnPageDto } from '@dto/page/page'
import Responses from '@utils/api-responses'
import { publishPageUseCase } from '@use-cases/publish-page'


export async function publishPageHandler({
    pathParameters
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {

        if (!pathParameters || !pathParameters?.id)
            throw new ValidationError('no id in the path parameters of the event')

        const { id } = pathParameters

        console.log(`reqiested publish page: ${id}`)

        const result: ReturnPageDto = await publishPageUseCase(id)

        console.log(`page published: ${JSON.stringify(result.id)}`)

        return Responses._201(result)

    } catch (error) {
        return errorHandler(error)
    }
}