import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import { feedbackSchema } from "@schemas/user-feedback.schema"
import { schemaValidator } from "@packages/schema-validator"
import Responses from "@utils/api-responses"
import { saveUserFeedbackUseCase } from "@use-cases/save-user-feedback/save-user-feedback"
import { UserFeedbackDto } from "@dto/user-feedback/user-feedback"

export async function saveUserFeedbackHandler({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		if (!body) throw new ValidationError("No page body")

		const userFeedback: UserFeedbackDto = JSON.parse(body)

		schemaValidator(feedbackSchema, userFeedback)

		console.log(`user feedback: ${JSON.stringify(userFeedback)}`)

		await saveUserFeedbackUseCase(userFeedback)

		return Responses._201()
	} catch (error) {
		return errorHandler(error)
	}
}
