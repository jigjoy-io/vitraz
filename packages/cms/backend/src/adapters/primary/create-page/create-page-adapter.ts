import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import { CreatePageDto, ReturnPageDto } from "@dto/page/page"
import { schema } from "@schemas/create-page.schema"
import { schemaValidator } from "@packages/schema-validator"
import Responses from "@utils/api-responses"
import { createPageUseCase } from "@use-cases/create-page"

/**
 * Handles the creation of a new page based on the provided request body.
 * @param {APIGatewayProxyEvent} event - The API Gateway event containing the request body.
 * @returns {Promise<APIGatewayProxyResult>} A promise that resolves to an API Gateway response with the created page details.
 * @throws {ValidationError} If the request body is empty.
 */
export async function createPageHandler({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		if (!body) throw new ValidationError("No page body")

		const page: CreatePageDto = JSON.parse(body)

		schemaValidator(schema, page)

		console.log(`page: ${JSON.stringify(page)}`)

		const createdPage: ReturnPageDto = await createPageUseCase(page)

		console.log(`page created: ${JSON.stringify(createdPage)}`)

		return Responses._201(createdPage)
	} catch (error) {
		return errorHandler(error)
	}
}
