import { S3, PutObjectCommand } from "@aws-sdk/client-s3"

const s3 = new S3()
const assetsBucket = process.env.ASSETS_BUCKET

/**
 * Uploads a file to S3 and returns the file URL.
 * @param {Object} file - The file object to upload.
 * @param {string} file.filename - The name of the file.
 * @param {Buffer} file.content - The file content.
 * @param {string} file.mimetype - The file's MIME type.
 * @param {string} file.rootPageId - The root page id.
 * @returns {Promise<string>} The URL of the uploaded file.
 */
export async function uploadDocument(file: { filename: string; content: Buffer; mimetype: string; rootPageId: string }): Promise<string> {
	const folderPath = `assets/${file.rootPageId}/`

	const params = {
		Bucket: assetsBucket,
		Key: `${folderPath}${file.filename}`,
		Body: file.content,
		ContentType: file.mimetype,
	}

	try {
		await s3.send(new PutObjectCommand(params))
		const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`
		return fileUrl
	} catch (error) {
		console.error("S3 file upload error:", error)
		throw new Error("S3 file upload failed")
	}
}
