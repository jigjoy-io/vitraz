import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, QueryCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb'
import { PageDto } from "@dto/page/page"
import { EnvironmentType } from '@models/types'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.PAGE_TABLE
import { compress, decompress } from 'compress-json'

const compressPage = (page: PageDto) => {
	let p = JSON.parse(JSON.stringify(page))
	p.config = compress(page.config)
	return p
}

const decompressPage = (item: any): PageDto => {

	let p = JSON.parse(JSON.stringify(item))
	p.config = decompress(p.config)
	const page: PageDto = {
		...(p as PageDto),
	}

	return page
}

export async function putPage(page: PageDto): Promise<PageDto> {


	let item = compressPage(page)
	const params = {
		TableName: tableName,
		Item: item
	}

	await ddbDocClient.send(new PutCommand(params))

	return page
}

export async function getPage(pageId: string): Promise<PageDto> {

	var params = {
		TableName: tableName,
		Key: { id: pageId },
	}

	const { Item: item } = await ddbDocClient.send(new GetCommand(params))

	let page : PageDto = decompressPage(item)

	return page
}

export async function putPages(pages: PageDto[]): Promise<PageDto[]> {

	

	const createPutRequest = (page: PageDto) => {
		let item = compressPage(page)
		return {
			PutRequest: {
				Item: item
			}
		}
	}

	let requests = pages.map(createPutRequest)

	const chunkSize = 25 // dynamodb max chunk size for working with batch
	for (let i = 0; i < requests.length; i += chunkSize) {
		const chunk = requests.slice(i, i + chunkSize)

		const command = new BatchWriteCommand({
			RequestItems: {
				[tableName as string]: chunk,
			},
		})

		await ddbDocClient.send(command)
	}

	return pages
}



export async function deletePage(pageId: any): Promise<void> {

	var params = {
		TableName: tableName,
		Key: { id: pageId },
		ReturnValues: "ALL_OLD"
	}

	const result = await ddbDocClient.send(new DeleteCommand(params))

	if(result.Attributes && result.Attributes.linkedPageId) {
		const linkedPageId = result.Attributes.linkedPageId;
		const prodParams = {
			TableName: tableName,
			Key: { id: linkedPageId },
		};
		
		await ddbDocClient.send(new DeleteCommand(prodParams));
	}
	

}

export async function getPages(origin: string): Promise<PageDto[]> {

	const params = {
		KeyConditionExpression: 'origin = :origin',
		IndexName: 'pageGSI',
		ExpressionAttributeValues: {
			':origin': origin
		},
		TableName: tableName
	}

	const data = await ddbDocClient.send(new QueryCommand(params))
	let items: any = data.Items as []
	items = items.filter((item: any) => item.environment===EnvironmentType.Development) 
	let pages: PageDto[] = items.map(decompressPage)


	return pages
}
