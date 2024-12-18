import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import { ReturnPageDto, UpdatePageDto } from "@dto/page/page"
import { schema } from "@schemas/create-page.schema"
import { schemaValidator } from "@packages/schema-validator"
import Responses from "@utils/api-responses"
import { updatePageUseCase } from "@use-cases/update-page"

export async function updatePageHandler({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		if (!body) throw new ValidationError("No page body")

		const page: UpdatePageDto = JSON.parse(body)

		if (!page.id) throw new ValidationError("page id is not provided")

		schemaValidator(schema, page)

		console.log(`page: ${JSON.stringify(page)}`)

		const updatedPage: ReturnPageDto = await updatePageUseCase(page)

		console.log(`page updated: ${JSON.stringify(updatedPage)}`)

		return Responses._201(updatedPage)
	} catch (error) {
		return errorHandler(error)
	}
}
