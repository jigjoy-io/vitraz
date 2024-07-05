import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ValidationError } from '@errors/validation-error'
import { errorHandler } from '@packages/apigw-error-handler'
import { ReturnPageDto, UpdatePageDto } from '@dto/page/page'
import { schema } from '@schemas/create-page.schema'
import { schemaValidator } from '@packages/schema-validator'
import { updatePageUseCase } from '@use-cases/update-page/update-page'


/**
 * Handles updating a page based on the provided request body.
 * @param {APIGatewayProxyEvent} event - The API Gateway event containing the request body.
 * @returns {Promise<APIGatewayProxyResult>} A promise that resolves to an API Gateway response with the updated page information.
 * @throws {ValidationError} If the request body is missing or if the page id is not provided.
 */
export async function updatePageHandler({
	body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

	try {

		if (!body) throw new ValidationError('No page body')

		const page: UpdatePageDto = JSON.parse(body)

		if (!page.id)
            throw new ValidationError('page id is not provided')

		schemaValidator(schema, page)

		console.log(`page: ${JSON.stringify(page)}`)

		const updatedPage: ReturnPageDto = await updatePageUseCase(page)

		console.log(`page created: ${JSON.stringify(updatedPage)}`)

		return {
			statusCode: 201,
			body: JSON.stringify(updatedPage),
		}

	} catch (error) {
		return errorHandler(error)
	}
}