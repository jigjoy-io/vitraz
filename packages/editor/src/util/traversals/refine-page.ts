import { v4 as uuid } from "uuid"

function refineBuildingBlocks(block: any) {
	for (let i = 0; i < block.config.buildingBlocks.length; i++) {
		block.config.buildingBlocks[i] = refine(block.config.buildingBlocks[i])
	}
	return block
}

function refinePages(block: any) {
	for (let i = 0; i < block.config.pages.length; i++) {
		block.config.pages[i] = refine(block.config.pages[i])
	}

	return block
}

function refine(block) {
	block.id = uuid()

	if (block.type == "page") {
		//TODO: REMOVE AFTER REFACTORE
		delete block.root
		delete block.ident
		delete block.mode
		block.type = "blank"
		block = refineBuildingBlocks(block)
	} else if (block.type == "carousel") {
		//TODO: REMOVE AFTER REFACTORE
		delete block.root
		delete block.ident
		delete block.mode
		block = refinePages(block)
	} else if (block.type == "page-tile") {
		block.page = refine(block.page)
	} else if (block.type == "carousel-tile") {
		block.page = refine(block.page)
	} else if (block.type == "question") {
		for (let i = 0; i < block.answers.length; i++) {
			block.answers[i].id = uuid()
		}
	}
	return block
}

export function refinePage(block: any) {
	let newBlock = JSON.parse(JSON.stringify(block))
	newBlock = refine(newBlock)
	return newBlock
}
