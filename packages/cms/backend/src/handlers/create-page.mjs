import Responses from '../utils/api-responses.mjs'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { v4 as uuidv4 } from 'uuid'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.PAGE_TABLE

export const createPageHandler = async (event) => {

    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
    }

    console.info('received:', event)

    const page = JSON.parse(event.body)
    const creationDate = Date.now()

    var params = {
        TableName: tableName,
        Item: { id: uuidv4(), ...page, creationDate: creationDate }
    }

    const data = await ddbDocClient.send(new PutCommand(params))
    console.log("Success - page saved", data)

    const response = {
        statusCode: 200,
        body: params.Item
    }

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
    return Responses._200(response)
}
