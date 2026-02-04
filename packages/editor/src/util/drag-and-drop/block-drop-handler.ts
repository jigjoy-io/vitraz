import { useDrop } from "react-dnd"
import { useState, Dispatch } from "react"
import { RubberBandDropStrategy } from "../drag-and-drop/rubber-band-drop-strategy"
import { ToolbarDropStrategy } from "../drag-and-drop/toolbar-drop-strategy"
import { DropHandler } from "../drag-and-drop/drop-handler"

interface UseBlockDropHandlerParams {
	blocks: any[]
	selectedBlocks: any[]
	page: any
	activeCarousel: any
	dispatch: Dispatch<any>
	setIsDragging
	cancelCurrentSelection
}

interface DropTarget {
	block: any
	position: "top" | "bottom"
}

export function useBlockDropHandler({
	blocks,
	selectedBlocks,
	page,
	activeCarousel,
	dispatch,
	setIsDragging,
	cancelCurrentSelection,
}: UseBlockDropHandlerParams) {
	const [dropTarget, setDropTarget] = useState<DropTarget | null>(null)

	const dropHandler = new DropHandler(
		selectedBlocks.length > 0 ? new RubberBandDropStrategy() : new ToolbarDropStrategy(),
	)

	const [{ isOver, canDrop }, drop] = useDrop<any, void, { isOver: boolean; canDrop: boolean }>(
		() => ({
			accept: "BLOCK",
			hover(item, monitor) {
				const clientOffset = monitor.getClientOffset()
				if (!clientOffset) return

				const hoverElements = document.elementsFromPoint(clientOffset.x, clientOffset.y)
				const blockElement = hoverElements.find((el) => el.getAttribute("data-block-id"))

				let hoverBlock = blockElement

				if (blockElement) {
					const hoverBlockId = blockElement.getAttribute("data-block-id")
					hoverBlock = blocks.find((block) => block.id === hoverBlockId)
				} else {
					const blocksRects = blocks.map((block) => {
						const element = document.querySelector(`[data-block-id="${block.id}"]`)
						return {
							block,
							rect: element?.getBoundingClientRect(),
						}
					})

					const nearestBlock = blocksRects.find(
						({ rect }) =>
							rect &&
							clientOffset.x >= rect.left - 200 &&
							clientOffset.x <= rect.right + 200 &&
							clientOffset.y >= rect.top &&
							clientOffset.y <= rect.bottom,
					)

					hoverBlock = nearestBlock?.block || null
				}

				if (hoverBlock) {
					const blockElement = document.querySelector(`[data-block-id="${hoverBlock.id}"]`)
					if (!blockElement) return

					const hoverRect = blockElement.getBoundingClientRect()
					const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2
					const hoverClientY = clientOffset.y - hoverRect.top
					const position = hoverClientY < hoverMiddleY ? "top" : "bottom"

					if (!dropTarget || dropTarget.block?.id !== hoverBlock.id || dropTarget.position !== position) {
						setDropTarget({ block: hoverBlock, position })
					}
				} else {
					setDropTarget(null)
				}
			},
			drop(item, monitor) {
				setIsDragging(false)
				dropHandler.execute(dropTarget, selectedBlocks, blocks, page, activeCarousel, dispatch, setDropTarget, item)
				setDropTarget(null)
				cancelCurrentSelection()
			},
			begin: () => {
				setIsDragging(true)
			},
		}),
		[blocks, page, dropTarget, selectedBlocks, activeCarousel, dispatch],
	)

	return { isOver, canDrop, drop, dropTarget, setDropTarget }
}
