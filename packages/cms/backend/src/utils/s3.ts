import { S3, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3"
const assetsBucket = process.env.ASSETS_BUCKET

const s3 = new S3()

export async function deleteAssets(folderPath: string): Promise<void> {
	const listParams = {
		Bucket: assetsBucket,
		Prefix: folderPath,
	}

	const listedObjects = await s3.send(new ListObjectsV2Command(listParams))

	if (listedObjects.Contents && listedObjects.Contents.length > 0) {
		const deleteParams = {
			Bucket: assetsBucket,
			Delete: {
				Objects: listedObjects.Contents.map((object) => ({ Key: object.Key })),
			},
		}

		await s3.send(new DeleteObjectsCommand(deleteParams))
	}
}
