import { store } from "../store"
interface Block {
	id: string
	type: string
	[key: string]: any
}

const getBlocks = () => {
	const state: any = store.getState().page

	let blocks = []
	if (state.activePage.type == "carousel") {
		const currentCarousel = state.currentCarouselPage
			? state.activePage.config.pages.findIndex((page) => page.id == state.currentCarouselPage)
			: 0

		blocks = state.activePage.config.pages[currentCarousel].config.buildingBlocks
	} else {
		blocks = state.activePage.config.buildingBlocks
	}
	return blocks
}
export const findPreviousTextBlock = (currentBlockId: string): Block | null => {
	const blocks: Block[] = getBlocks()
	const validTypes: string[] = ["text", "title", "heading", "block-selector"]

	const currentIndex = blocks?.findIndex((block) => block.id === currentBlockId)

	if (currentIndex <= 0) return null

	for (let i = currentIndex - 1; i >= 0; i--) {
		if (validTypes.includes(blocks[i].type)) {
			return blocks[i]
		}
	}

	return null
}

export const findNextBlock = (currentBlockId: string): Block | null => {
	const blocks: Block[] = getBlocks()
	let nextBlockIndex = -1
	let currentBlockIndex = blocks.findIndex((block: any) => block.id === currentBlockId)
	nextBlockIndex = currentBlockIndex + 1

	if (!blocks || nextBlockIndex < 1 || nextBlockIndex >= blocks.length) return null
	return blocks[nextBlockIndex]
}
