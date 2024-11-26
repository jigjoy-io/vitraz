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
}: UseBlockDropHandlerParams) {
	const [dropTarget, setDropTarget] = useState<DropTarget | null>(null)

	const dropHandler = new DropHandler(
		selectedBlocks.length > 0 ? new RubberBandDropStrategy() : new ToolbarDropStrategy(),
	)

	const [{ isOver, canDrop }, drop] = useDrop<any, void, { isOver: boolean; canDrop: boolean }>(
		() => ({
			accept: "BLOCK",
			hover(item, monitor) {
				const dragRect = monitor.getSourceClientOffset()
				if (!dragRect) return

				const hoverElements = document.elementsFromPoint(dragRect.x, dragRect.y)
				const blockElement = hoverElements.find((el) => el.getAttribute("data-block-id"))

				if (blockElement) {
					const hoverBlockId = blockElement.getAttribute("data-block-id")
					const hoverBlock = blocks.find((block) => block.id === hoverBlockId)

					if (!hoverBlock) return

					const hoverRect = blockElement.getBoundingClientRect()
					const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2
					const clientOffset = monitor.getClientOffset()

					if (!clientOffset) return

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
				dropHandler.execute(dropTarget, selectedBlocks, blocks, page, activeCarousel, dispatch, setDropTarget, item)
				setDropTarget(null)
			},
		}),
		[blocks, page, dropTarget],
	)

	return { isOver, canDrop, drop, dropTarget, setDropTarget }
}
