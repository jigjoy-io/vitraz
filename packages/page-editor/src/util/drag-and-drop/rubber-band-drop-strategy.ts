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

export class RubberBandDropStrategy implements DropStrategy {
	execute(dropTarget, selectedBlocks, blocks, page, activeCarousel, dispatch, setDropTarget) {
		if (!dropTarget || !selectedBlocks?.length) return

		const selectedBlockIds = selectedBlocks.map((block) => block.id)

		const filteredBlocks = blocks.filter((block) => !selectedBlockIds.includes(block.id))

		const targetBlockIndex = blocks.findIndex((block) => block.id === dropTarget.block.id)
		if (targetBlockIndex === -1) return

		const adjustedTargetIndex = dropTarget.position === "top" ? targetBlockIndex : targetBlockIndex + 1

		filteredBlocks.splice(adjustedTargetIndex, 0, ...selectedBlocks)

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
