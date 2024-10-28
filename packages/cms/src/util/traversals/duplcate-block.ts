import { v4 as uuid } from "uuid"

function refineBuildingBlocks(block: any) {
	for (let i = 0; i < block.config.buildingBlocks.length; i++) {
		block.config.buildingBlocks[i] = replaceIds(block.config.buildingBlocks[i])
	}
	return block
}

function refinePages(block: any) {
	for (let i = 0; i < block.config.pages.length; i++) {
		block.config.pages[i] = replaceIds(block.config.pages[i])
	}

	return block
}

function replaceIds(block) {
	block.id = uuid()

	if (block.type == "blank") {
		//TODO: REMOVE AFTER REFACTORE
		delete block.root
		delete block.ident
		delete block.mode
		block = refineBuildingBlocks(block)
	} else if (block.type == "carousel") {
		//TODO: REMOVE AFTER REFACTORE
		delete block.root
		delete block.ident
		delete block.mode
		block = refinePages(block)
	} else if (block.type == "page-tile") {
		block.page = replaceIds(block.page)
	} else if (block.type == "carousel-tile") {
		block.page = replaceIds(block.page)
	}
	return block
}

export function duplicateBlock(block: any) {
	let newBlock = JSON.parse(JSON.stringify(block))
	newBlock = replaceIds(newBlock)
	return newBlock
}
