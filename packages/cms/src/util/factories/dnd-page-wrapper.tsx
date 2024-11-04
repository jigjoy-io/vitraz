// src/components/dnd/DndPageWrapper.tsx
import React, { useCallback } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useDispatch } from "react-redux"
import { useDrag, useDrop } from "react-dnd"
import { AppDispatch, usePage } from "../../util/store"
import { PageFactory } from "../../util/factories/page-factory"
import { updateBlock } from "../../reducers/page-reducer"

interface DraggablePageProps {
	block: any
	index: number
	moveBlock: (dragIndex: number, hoverIndex: number) => void
}

const DraggablePageComponent: React.FC<DraggablePageProps> = ({ block, index, moveBlock }) => {
	const page = usePage()
	const [{ isDragging }, drag] = useDrag({
		type: "PAGE_BLOCK",
		item: { index, id: block.id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const [, drop] = useDrop({
		accept: "PAGE_BLOCK",
		hover: (item: { index: number }, monitor) => {
			if (item.index === index) return
			moveBlock(item.index, index)
			item.index = index
		},
	})

	const renderBlock = () => {
		try {
			return PageFactory.get(page)
		} catch (error) {
			console.error("Error rendering block:", error)
			return <div>Error rendering block</div>
		}
	}

	return (
		<div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }} className="relative w-full border border-transparent hover:border-gray-200 mb-2">
			<div className="w-full">{renderBlock()}</div>
			<div className="absolute inset-0 cursor-move bg-transparent z-10" />
		</div>
	)
}

const DndPageWrapper: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const page = usePage()

	const moveBlock = useCallback(
		(fromIndex: number, toIndex: number) => {
			if (!page?.config?.buildingBlocks) return

			const newBlocks = [...page.config.buildingBlocks]
			const [movedBlock] = newBlocks.splice(fromIndex, 1)
			newBlocks.splice(toIndex, 0, movedBlock)

			const updatedPage = {
				...page,
				config: {
					...page.config,
					buildingBlocks: newBlocks,
				},
			}

			dispatch(updateBlock(updatedPage))
		},
		[page, dispatch],
	)

	if (!page?.config?.buildingBlocks) {
		return null
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex flex-col w-full h-full">
				{page.config.buildingBlocks.map((block, index) => (
					<DraggablePageComponent key={block.id || index} block={block} index={index} moveBlock={moveBlock} />
				))}
			</div>
		</DndProvider>
	)
}

export default DndPageWrapper
