import Responses from '../utils/api-responses.mjs'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.PAGE_TABLE

/**
 * Update existing page.
 */

export const updatePageHandler = async (event) => {
    
    if (event.httpMethod !== 'PUT') {
        throw new Error(`PUT method only accepts PUT method, you tried: ${event.httpMethod} method.`)
    }

    // All log statements are written to CloudWatch
    console.info('received:', event)

    const body = JSON.parse(event.body)
    
    if(body.id==null || body.id==undefined)
        throw new Error(`Page id is not provided.`)

    let request = { ...body }

    const params = {
        TableName: tableName,
        Item: request
    }

    const data = await ddbDocClient.send(new PutCommand(params))
    console.log("Success - page updated", data.Item)

    let response = {
        statusCode: 200,
        body: {
            message: 'Page successfully updated',
            ...request
        }
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
    return Responses._200(response)
}
