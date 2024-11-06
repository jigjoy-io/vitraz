import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { ValidationError } from "@errors/validation-error"
import { errorHandler } from "@packages/apigw-error-handler"
import Responses from "@utils/api-responses"
import { uploadDocumentUseCase } from "@use-cases/upload-document"

export async function uploadDocumentHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		if (event.httpMethod !== "PUT") {
			throw new ValidationError(`PUT method only accepts PUT requests. You tried: ${event.httpMethod}`)
		}

		const { file, name, type, rootPageId } = JSON.parse(event.body || "{}")

		if (!file || !name || !type) {
			throw new ValidationError("Missing required fields: file, name, app (slug), or type.")
		}

		const fileContent = Buffer.from(file.replace(/^data:(image|video|audio)\/\w+;base64,/, ""), "base64")

		const fileData = {
			filename: name,
			content: fileContent,
			mimetype: type,
			rootPageId: rootPageId,
		}

		const fileUrl = await uploadDocumentUseCase(fileData)

		return Responses._200({ message: "File successfully uploaded.", filePath: fileUrl })
	} catch (error) {
		return errorHandler(error)
	}
}
