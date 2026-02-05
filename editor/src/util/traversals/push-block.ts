function addToBlankPage(page: any, payload: any) {
	page.config.buildingBlocks.push(payload.block)
	return page
}

function addToCarouselPage(page: any, payload: any) {
	let { pageId, block } = payload

	for (let i = 0; i < page.config.pages.length; i++) {
		if (page.config.pages[i].id == pageId) {
			page.config.pages[i].config.buildingBlocks.push(block)
			return page
		}
	}
}
export function pushBlock(page: any, payload: any) {
	if (page.type == "blank") {
		return addToBlankPage(page, payload)
	}
}
