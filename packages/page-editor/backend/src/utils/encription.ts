import { KMSClient, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms"

const { KMS_KEY_ID } = process.env
const client = new KMSClient()

export async function encrypt(inpt: any): Promise<any> {
	const input = {
		KeyId: KMS_KEY_ID,
		Plaintext: inpt,
	}

	const command = new EncryptCommand(input)
	const resp = await client.send(command)

	return resp.CiphertextBlob
}

export async function decrypt(ciphertext: any): Promise<any> {
	const input = {
		CiphertextBlob: Buffer.from(ciphertext, "base64"),
	}

	const command = new DecryptCommand(input)
	const { Plaintext } = await client.send(command)
	const enc = new TextDecoder("utf-8")
	return enc.decode(Plaintext)
}
