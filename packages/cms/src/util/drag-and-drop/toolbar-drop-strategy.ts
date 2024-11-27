import { updateBlock } from "../../reducers/page-reducer"
import { DropStrategy } from "./drop-strategy"

function findPageById(page, targetId) {
	if (page.id === targetId) {
		return page
	}

	if (page.config && page.config.pages && Array.isArray(page.config.pages)) {
		for (const nestedPage of page.config.pages) {
			const result = findPageById(nestedPage, targetId)
			if (result) {
				return result
			}
		}
	}

	return null
}

export class ToolbarDropStrategy implements DropStrategy {
	execute(dropTarget, selectBlocks, blocks, page, activeCarousel, dispatch, setDropTarget, item) {
		if (!dropTarget || !item) return

		const draggedBlockId = item?.block?.id
		const draggedBlock = blocks.find((block) => block.id === draggedBlockId)

		if (!draggedBlock) return

		const filteredBlocks = blocks.filter((block) => block.id !== draggedBlockId)

		const targetIndex = blocks.findIndex((block) => block.id === dropTarget.block.id)
		if (targetIndex === -1) return

		const newPosition = dropTarget.position === "top" ? targetIndex : targetIndex + 1
		filteredBlocks.splice(newPosition, 0, draggedBlock)

		const carouselPage = findPageById(page, activeCarousel)
		const targetPage = carouselPage || page

		dispatch(
			updateBlock({
				...targetPage,
				config: {
					...targetPage.config,
					buildingBlocks: filteredBlocks,
				},
			}),
		)

		setDropTarget(null)
	}
}
