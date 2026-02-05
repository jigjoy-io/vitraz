import { v4 as uuidv4 } from "uuid"
import { TemplatesStorage } from "./templates"

export default class TemplateFactory {
	static create(type: string) {
		let templates = TemplatesStorage.getTemplates()

		let block: any = templates[type]

		let template = JSON.parse(JSON.stringify(block))
		template.id = uuidv4()
		return template
	}

	static createBlockSelector() {
		return this.create("block-selector")
	}

	static createTextBlock(text) {
		let textBlock = this.create("text")
		textBlock.text = text
		return textBlock
	}

	static createBlankPage(origin) {
		let blankPage = this.create("blank")
		let selector = this.createBlockSelector()
		blankPage.config.buildingBlocks.push(selector)
		blankPage.origin = origin
		return blankPage
	}

	static createImageBlock(fileUrl) {
		let imageBlock = this.create("image")
		imageBlock.source = fileUrl
		return imageBlock
	}

	static createAudioBlock(fileUrl) {
		let audioBlock = this.create("audio")
		audioBlock.source = fileUrl
		return audioBlock
	}

	static createReelBlock(fileUrl) {
		let reelBlock = this.create("reel")
		reelBlock.source = fileUrl
		return reelBlock
	}

	static createPage(type, origin) {
		if (type == "blank") return this.createBlankPage(origin)

		throw "Page not supported"
	}

	static createMediaBlock(uploadedFileUrl: null | undefined, mediaType: string) {
		if (mediaType === "audio") {
			return TemplateFactory.createAudioBlock(uploadedFileUrl)
		}
		if (mediaType === "image") {
			return TemplateFactory.createImageBlock(uploadedFileUrl)
		}
		if (mediaType === "video") {
			return TemplateFactory.createReelBlock(uploadedFileUrl)
		}
	}

	static createPageTileBlock(origin) {
		let block = this.create("page-tile")
		let page = this.createBlankPage(origin)

		block.page = page

		return block
	}

	static createTile(type, origin) {
		if (type != "page-tile") throw "Page not supported"

		let block: any = null

		if (type == "page-tile") block = this.createPageTileBlock(origin)

		return block
	}
}
