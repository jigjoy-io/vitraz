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

		// Collect IDs of selected blocks
		console.log("SLEC", selectedBlocks)
		console.log("BLOX", blocks)
		const selectedBlockIds = selectedBlocks.map((block) => block.id)
		console.log("T1")

		// Remove selected blocks from the current block list
		const filteredBlocks = blocks.filter((block) => !selectedBlockIds.includes(block.id))
		console.log("T2", dropTarget)

		// Find the target block's index
		const targetBlockIndex = blocks.findIndex((block) => block.id === dropTarget.block.id)
		if (targetBlockIndex === -1) return
		console.log("T3")

		// Adjust target index based on drop position
		const adjustedTargetIndex = dropTarget.position === "top" ? targetBlockIndex : targetBlockIndex + 1

		// Insert selected blocks at the new position
		filteredBlocks.splice(adjustedTargetIndex, 0, ...selectedBlocks)

		// Find the target page
		const carouselPage = findPageById(page, activeCarousel)
		const targetPage = carouselPage || page

		// Update the state with the rearranged blocks
		dispatch(
			updateBlock({
				...targetPage,
				config: {
					...targetPage.config,
					buildingBlocks: filteredBlocks,
				},
			}),
		)

		// Reset the drop target
		setDropTarget(null)
	}
}
