import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import { ReturnPageDto, UpdatePageDto } from "@dto/page/page"
import Responses from "@utils/api-responses"
import { publishPageUseCase } from "@use-cases/publish-page"
import { schemaValidator } from "@packages/schema-validator"
import { schema } from "@schemas/create-page.schema"

export async function publishPageHandler({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		if (!body) throw new ValidationError("No page body")

		const page: UpdatePageDto = JSON.parse(body)

		if (!page.id) throw new ValidationError("page id is not provided")

		schemaValidator(schema, page)

		console.log(`request for page publishing: ${JSON.stringify(page)}`)

		const pages: ReturnPageDto[] = await publishPageUseCase(page)

		console.log(`page published: ${JSON.stringify(pages)}`)

		return Responses._201(pages)
	} catch (error) {
		return errorHandler(error)
	}
}
