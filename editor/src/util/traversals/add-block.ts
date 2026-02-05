function addToBlankPage(page: any, payload: any) {
	let { referenceBlock, block, position } = payload

	let referenceBlockIndex = page.config.buildingBlocks.findIndex((b: any) => b.id == referenceBlock)
	let index = position === "above" ? referenceBlockIndex : referenceBlockIndex + 1
	page.config.buildingBlocks.splice(index, 0, block)

	return page
}

function addToCarouselPage(page: any, payload: any) {
	let { referenceBlock, block, position } = payload

	for (let i = 0; i < page.config.pages.length; i++) {
		let referenceBlockIndex = page.config.pages[i].config.buildingBlocks.findIndex((b: any) => b.id == referenceBlock)

		if (referenceBlockIndex != -1) {
			let index = position === "above" ? referenceBlockIndex : referenceBlockIndex + 1
			page.config.pages[i].config.buildingBlocks.splice(index, 0, block)
			return page
		}
	}

	return page
}
export function addBlock(page: any, payload: any) {
	//TODO: REMOVE AFTER REFACTORE
	delete page.root
	delete page.ident
	delete page.mode
	if (page.type == "blank") {
		page = addToBlankPage(page, payload)
	}
	return page
}
