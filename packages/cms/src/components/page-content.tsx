import React, { useEffect, useState, useCallback, useRef } from "react"
import { LazyMotion, m } from "framer-motion"
import { useMode } from "../util/store"
import { appendBlock, focusBlock, updateBlock } from "../reducers/page-reducer"
import { useDispatch } from "react-redux"
import TemplateFactory from "../util/factories/templates/template-factory"
import BuildingBlock from "../util/factories/building-block"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Identifier } from "dnd-core"
import update from "immutability-helper"

const animation = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			duration: 1,
			staggerChildren: 0.33,
		},
	},
}

const item = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
}

const DraggableBlock = React.memo(({ block, index, moveBlock, mode }: { block: any; index: number; moveBlock: (dragIndex: number, hoverIndex: number) => void; mode: string }) => {
	const [dropPosition, setDropPosition] = useState<"top" | "bottom" | null>(null)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		element.addEventListener("dragstart", (e) => {
			if (e.dataTransfer) {
				const dragPreview = element.cloneNode(true) as HTMLElement
				dragPreview.style.opacity = "0.25"
				dragPreview.style.position = "absolute"
				dragPreview.style.top = "-3000px"
				dragPreview.style.left = "-3000px"
				document.body.appendChild(dragPreview)

				const rect = dragPreview.getBoundingClientRect()

				e.dataTransfer.setDragImage(dragPreview, -20, rect.height + 5000)

				setTimeout(() => document.body.removeChild(dragPreview), 0)
			}
		})
	}, [])

	const [{ handlerId, isOver }, drop] = useDrop<{ index: number; id: string; type: string }, void, { handlerId: Identifier | null; isOver: boolean }>({
		accept: "BLOCK",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
				isOver: monitor.isOver(),
			}
		},
		hover(item, monitor) {
			if (!ref.current) return

			const dragIndex = item.index
			const hoverIndex = index

			if (dragIndex === hoverIndex) {
				setDropPosition(null)
				return
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			const clientOffset = monitor.getClientOffset()

			if (!clientOffset) return

			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			setDropPosition(hoverClientY <= hoverMiddleY ? "top" : "bottom")
		},
		drop(item, monitor) {
			if (!ref.current) return

			const dragIndex = item.index
			const hoverIndex = index

			if (dragIndex === hoverIndex) return

			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			const clientOffset = monitor.getClientOffset()

			if (!clientOffset) return

			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			const finalPosition = hoverClientY < hoverMiddleY ? "top" : "bottom"
			const finalIndex = finalPosition === "top" ? hoverIndex : hoverIndex + 1

			moveBlock(dragIndex, finalIndex)
			item.index = finalIndex
			setDropPosition(null)
		},
	})

	const [{ isDragging }, drag] = useDrag({
		type: "BLOCK",
		item: () => ({ id: block.id, index, type: "BLOCK" }),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	drag(drop(ref))

	return (
		<div className="relative group">
			{isOver && dropPosition === "top" && (
				<div
					className="absolute -top-[1px] left-0 right-0 h-[3px]"
					style={{
						zIndex: 100,
						backgroundColor: "#F672D1",
					}}
				/>
			)}
			<m.div ref={ref} variants={item} style={{ opacity: isDragging ? 0 : 1 }} data-handler-id={handlerId} className={`relative ${isDragging ? "z-50" : "z-0"}`}>
				<div className="relative">
					{mode === "editing" && (
						<div
							className="opacity-0 group-hover:opacity-0 absolute left-2 
                         cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
						>
							<span className="select-none">⋮⋮</span>
						</div>
					)}
					<div className={`${mode === "editing" ? "pl-8" : ""}`}>
						<BuildingBlock {...block} mode={mode} />
					</div>
				</div>
			</m.div>
			{isOver && dropPosition === "bottom" && (
				<div
					className="absolute -bottom-[1px] left-0 right-0 h-[3px]"
					style={{
						zIndex: 100,
						backgroundColor: "#F672D1",
					}}
				/>
			)}
		</div>
	)
})

const loadFeatures = () => import("../util/style-helper/animations").then((res) => res.default)

export default function PageContent(props: any) {
	const mode = useMode()
	const dispatch = useDispatch()
	const [blocks, setBlocks] = useState<any[]>([])

	useEffect(() => {
		if (props.config?.buildingBlocks) {
			setBlocks(props.config.buildingBlocks)
		}
	}, [props.config?.buildingBlocks])

	const moveBlock = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			setBlocks((prevBlocks: any[]) => {
				const newBlocks = update(prevBlocks, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, prevBlocks[dragIndex]],
					],
				})

				dispatch(
					updateBlock({
						...props,
						config: {
							...props.config,
							buildingBlocks: newBlocks,
						},
					}),
				)

				return newBlocks
			})
		},
		[dispatch, props],
	)

	const activateSelector = useCallback(() => {
		if (blocks.length !== 0 && blocks[blocks.length - 1].type === "block-selector") {
			dispatch(focusBlock(blocks[blocks.length - 1].id))
		} else {
			const selector = TemplateFactory.createBlockSelector()
			dispatch(
				appendBlock({
					pageId: props.id,
					block: selector,
				}),
			)
		}
	}, [blocks, dispatch, props.id])

	if (!blocks) {
		return null
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="bg-white h-full flex flex-col break-words">
				<div className="relative">
					<LazyMotion features={loadFeatures}>
						<m.div variants={animation} initial="hidden" animate="show">
							{blocks.map((block, index) => (
								<DraggableBlock key={block.id} block={block} index={index} moveBlock={moveBlock} mode={mode} />
							))}
						</m.div>
					</LazyMotion>
				</div>
				<div className="grow min-h-[150px]" onClick={activateSelector}></div>
			</div>
		</DndProvider>
	)
}
