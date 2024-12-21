import React, { ReactElement } from "react"
import RenderBlockFactory from "./render-block-factory."
import AbstractBlockFactory from "./abstract-block-factory"

export default class BlockFactory {
	static factory: AbstractBlockFactory = new RenderBlockFactory()

	static createBlock(blockConfig: any): ReactElement {
		switch (blockConfig.type) {
			case "title":
				return this.factory.createTitleBlock(blockConfig)
			case "heading":
				return this.factory.createHeadingBlock(blockConfig)
			case "text":
				return this.factory.createTextBlock(blockConfig)
			case "image":
				return this.factory.createImageBlock(blockConfig)
			case "audio":
				return this.factory.createAudioBlock(blockConfig)
			case "reel":
				return this.factory.createVideoBlock(blockConfig)
			case "profile":
				return this.factory.createProfileBlock(blockConfig)
			case "carousel-tile":
				return this.factory.createCarouselTileBlock(blockConfig)
			case "page-tile":
				return this.factory.createPageTileBlock(blockConfig)
			case "question":
				return this.factory.createQuestionBlock(blockConfig)
			case "message":
				return this.factory.createMessageBlock(blockConfig)
			default:
				return <></>
		}
	}
}
