import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { PageDto } from "@dto/page/page"
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.PAGE_TABLE

/**
 * Put a page in the database with the provided data.
 * @param {PageDto} page - The page data to be stored in the database.
 * @returns {Promise<PageDto>} - A promise that resolves to the saved page data.
 */
export async function putPage(page: PageDto): Promise<PageDto> {

    const params = {
        TableName: tableName,
        Item: page
    }

    await ddbDocClient.send(new PutCommand(params))

    return page
}

/**
 * Retrieves a page from the database based on the provided page ID.
 * @param {string} pageId - The ID of the page to retrieve.
 * @returns {Promise<PageDto>} A promise that resolves to the retrieved page as a PageDto object.
 */
export async function getPage(pageId: string): Promise<PageDto> {

    var params = {
        TableName: tableName,
        Key: { id: pageId },
    }

    const { Item: item } = await ddbDocClient.send(new GetCommand(params))

    const page: PageDto = {
        ...(item as PageDto),
    }

    return page
}



export async function deletePage(pageId: any): Promise<void> {

    var params = {
        TableName: tableName,
        Key: { id: pageId },
    }

    console.log(params)
    
    await ddbDocClient.send(new DeleteCommand(params))

}

export async function getPages(origin: string): Promise<PageDto []> {

    const params = {
		KeyConditionExpression: 'origin = :origin',
		IndexName: 'pageGSI',
		ExpressionAttributeValues: {
			':origin': origin
		},
		TableName: tableName
	}

	const data = await ddbDocClient.send(new QueryCommand(params))
    let items = data.Items as []
	let pages: PageDto [] = items.map((item) => item as PageDto)


    return pages
}
