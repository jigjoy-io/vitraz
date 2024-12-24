import { UserFeedbackDto } from "@dto/user-feedback"

import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.USER_FEEDBACK_TABLE

export async function putUserFeedback(page: UserFeedbackDto): Promise<void> {
	const params = {
		TableName: tableName,
		Item: page,
	}

	await ddbDocClient.send(new PutCommand(params))
}
