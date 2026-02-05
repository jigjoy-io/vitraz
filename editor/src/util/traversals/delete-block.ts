function deleteFromBlankPage(page: any, blockId: any) {
	page.config.buildingBlocks = page.config.buildingBlocks.filter((block: any) => block.id !== blockId)
	return page
}

export function deleteBlock(page: any, blockId: any) {
	//TODO: REMOVE AFTER REFACTORE
	delete page.root
	delete page.ident
	delete page.mode
	if (page.type == "blank") {
		page = deleteFromBlankPage(page, blockId)
	}
	return page
}
