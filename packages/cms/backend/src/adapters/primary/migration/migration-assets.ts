import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { errorHandler } from "@packages/apigw-error-handler"

import { retrievePageUseCase } from "@use-cases/retrieve-page"
import { updatePageUseCase } from "@use-cases/update-page"

export async function migrateAssetsHandler({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	try {
		let pages: any[] = ["8ae504a7-51a1-4572-902d-09a503c167fb"]

		const createNewBlock = async (block: any, folder: string) => {
			let b = JSON.parse(JSON.stringify(block))
			console.log(b)

			if (b.type == "carousel-tile" || b.type == "page-tile") {
				if (b.image && b.image.startsWith("https://s3.eu-west-1.amazonaws.com/jigjoy.io")) {
					const name = b.image.replace(/^.*[\\/]/, "")
					b.image = `https://s3.eu-west-1.amazonaws.com/legacy.jigjoy.io/assets/${folder}/${name}`
				}

				b.page = await createNewPage(b.page, folder)
			} else if (b.type == "profile") {
				if (b.image && b.image.startsWith("https://s3.eu-west-1.amazonaws.com/jigjoy.io")) {
					const name = b.image.replace(/^.*[\\/]/, "")
					b.image = `https://s3.eu-west-1.amazonaws.com/legacy.jigjoy.io/assets/${folder}/${name}`
				}
			} else if (b.type == "image" && b.source.startsWith("https://s3.eu-west-1.amazonaws.com/jigjoy.io")) {
				const name = b.source.replace(/^.*[\\/]/, "")
				b.source = `https://s3.eu-west-1.amazonaws.com/legacy.jigjoy.io/assets/${folder}/${name}`
			} else if (b.type == "audio" && b.source.startsWith("https://s3.eu-west-1.amazonaws.com/jigjoy.io")) {
				const name = b.source.replace(/^.*[\\/]/, "")
				b.source = `https://s3.eu-west-1.amazonaws.com/legacy.jigjoy.io/assets/${folder}/${name}`
			} else if (b.type == "reel" && b.source.startsWith("https://s3.eu-west-1.amazonaws.com/jigjoy.io")) {
				const name = b.source.replace(/^.*[\\/]/, "")
				b.source = `https://s3.eu-west-1.amazonaws.com/legacy.jigjoy.io/assets/${folder}/${name}`
			} else if (
				b.type == "question" &&
				b.content &&
				b.content.image &&
				b.content.image.startsWith("https://s3.eu-west-1.amazonaws.com/jigjoy.io")
			) {
				const name = b.content.image.replace(/^.*[\\/]/, "")
				b.content.image = `https://s3.eu-west-1.amazonaws.com/legacy.jigjoy.io/assets/${folder}/${name}`
			} else if (b.type == "message" && b.audio.startsWith("https://s3.eu-west-1.amazonaws.com/jigjoy.io")) {
				const name = b.audio.replace(/^.*[\\/]/, "")
				b.audio = `https://s3.eu-west-1.amazonaws.com/legacy.jigjoy.io/assets/${folder}/${name}`
			}
			return b
		}

		const createNewPage = async (page: any, folder: string) => {
			let p: any = JSON.parse(JSON.stringify(page))

			if (p.type == "blank") {
				p.config = {
					buildingBlocks: await Promise.all(page.config.buildingBlocks.map((b: any) => createNewBlock(b, folder))),
				}
			} else if (p.type == "carousel") {
				p.config = {
					...p.config,
					pages: await Promise.all(page.config.pages.map((pg: any) => createNewPage(pg, folder))),
				}
			}

			return p
		}

		for (let i = 0; i < pages.length; i++) {
			let pageId = pages[i]

			let page: any = await retrievePageUseCase(pageId)

			console.log(page)

			page = await createNewPage(page, pageId)

			console.log(page)

			await updatePageUseCase(page)
		}

		return {
			statusCode: 201,
			body: JSON.stringify({}),
		}
	} catch (error) {
		return errorHandler(error)
	}
}
