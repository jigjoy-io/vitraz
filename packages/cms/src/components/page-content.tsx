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

interface SelectionRange {
	start: number
	end: number
}

const DraggableBlock = React.memo(
	({
		block,
		index,
		moveBlocks,
		mode,
		isSelected,
		onSelect,
		selectedBlocks,
		onSelectionStart,
		onSelectionEnd,
		isDraggingAny,
	}: {
		block: any
		index: number
		moveBlocks: (dragIndices: number[], targetIndex: number) => void
		mode: string
		isSelected: boolean
		onSelect: (index: number, multiSelect: boolean) => void
		selectedBlocks: number[]
		onSelectionStart: (index: number) => void
		onSelectionEnd: (index: number) => void
		isDraggingAny: boolean
	}) => {
		const [dropPosition, setDropPosition] = useState<"top" | "bottom" | null>(null)
		const ref = useRef<HTMLDivElement>(null)
		const [isHovered, setIsHovered] = useState(false)
		const dragStartPosRef = useRef<{ x: number; y: number } | null>(null)

		const [{ handlerId, isOver }, drop] = useDrop<
			{ indices: number[]; type: string },
			void,
			{ handlerId: Identifier | null; isOver: boolean }
		>({
			accept: "BLOCK",
			collect(monitor) {
				return {
					handlerId: monitor.getHandlerId(),
					isOver: monitor.isOver(),
				}
			},
			hover(item, monitor) {
				if (!ref.current) return

				const hoverBoundingRect = ref.current?.getBoundingClientRect()
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
				const clientOffset = monitor.getClientOffset()

				if (!clientOffset) return

				const hoverClientY = clientOffset.y - hoverBoundingRect.top
				setDropPosition(hoverClientY <= hoverMiddleY ? "top" : "bottom")
			},
			drop(item, monitor) {
				if (!ref.current) return

				const hoverBoundingRect = ref.current?.getBoundingClientRect()
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
				const clientOffset = monitor.getClientOffset()

				if (!clientOffset) return

				const hoverClientY = clientOffset.y - hoverBoundingRect.top
				const finalPosition = hoverClientY < hoverMiddleY ? "top" : "bottom"
				const targetIndex = finalPosition === "top" ? index : index + 1

				moveBlocks(item.indices, targetIndex)
				setDropPosition(null)
			},
		})

		const [{ isDragging }, drag] = useDrag({
			type: "BLOCK",
			item: () => ({
				indices: isSelected ? selectedBlocks : [index],
				type: "BLOCK",
			}),
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		})

		const handleMouseDown = (e: React.MouseEvent) => {
			if (mode === "editing") {
				// Store initial click position
				dragStartPosRef.current = { x: e.clientX, y: e.clientY }

				if (e.shiftKey) {
					onSelectionStart(index)
				} else if (e.ctrlKey || e.metaKey) {
					// Do nothing here, we'll handle Ctrl/Cmd click on mouseUp
				} else if (!isSelected) {
					// Only clear selection if clicking on an unselected block
					onSelect(index, false)
				}
			}
		}

		const handleMouseUp = (e: React.MouseEvent) => {
			if (mode === "editing") {
				// Check if this was a click vs. a drag
				const isClick =
					dragStartPosRef.current &&
					Math.abs(e.clientX - dragStartPosRef.current.x) < 5 &&
					Math.abs(e.clientY - dragStartPosRef.current.y) < 5

				if (e.shiftKey) {
					onSelectionEnd(index)
				} else if (e.ctrlKey || e.metaKey) {
					onSelect(index, true)
				} else if (isClick && !isDragging) {
					// Only handle single selection on click, not during drag
					onSelect(index, false)
				}
			}
			dragStartPosRef.current = null
		}

		const handleMouseEnter = () => setIsHovered(true)
		const handleMouseLeave = () => setIsHovered(false)

		drag(drop(ref))

		const blockClasses = [
			"relative",
			"transition-all",
			"duration-150",
			mode === "editing" ? "hover:bg-gray-50" : "",
			isSelected ? "bg-blue-100 shadow-sm" : "bg-white",
			isDragging ? "opacity-50" : "",
			isHovered && !isSelected ? "bg-gray-50" : "",
		]
			.filter(Boolean)
			.join(" ")

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
				<m.div
					ref={ref}
					variants={item}
					style={{ opacity: isDragging ? 0 : 1 }}
					data-handler-id={handlerId}
					className={`relative ${isDragging ? "z-50" : "z-0"}`}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div className={blockClasses}>
						{mode === "editing" && (
							<div
								className={`
                absolute left-2 cursor-grab active:cursor-grabbing p-1 
                rounded transition-opacity duration-150
                ${isSelected || isHovered ? "opacity-100" : "opacity-0"}
              `}
							>
								<span className="select-none">⋮⋮</span>
							</div>
						)}
						<div
							className={`
            ${mode === "editing" ? "pl-8" : ""} 
            ${isSelected ? "ring-2 ring-blue-400" : ""}
            ${isDraggingAny ? "pointer-events-none" : ""}
          `}
						>
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
	},
)

const loadFeatures = () => import("../util/style-helper/animations").then((res) => res.default)

export default function PageContent(props: any) {
	const mode = useMode()
	const dispatch = useDispatch()
	const [blocks, setBlocks] = useState<any[]>([])
	const [selectedBlocks, setSelectedBlocks] = useState<number[]>([])
	const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null)
	const [isDragging, setIsDragging] = useState(false)

	useEffect(() => {
		if (props.config?.buildingBlocks) {
			setBlocks(props.config.buildingBlocks)
		}
	}, [props.config?.buildingBlocks])

	const moveBlocks = useCallback(
		(dragIndices: number[], targetIndex: number) => {
			setIsDragging(true)
			setBlocks((prevBlocks: any[]) => {
				// Sort indices in descending order to avoid index shifting during removal
				const sortedIndices = [...dragIndices].sort((a, b) => b - a)

				// Remove blocks from their original positions
				const movedBlocks = sortedIndices.map((index) => prevBlocks[index])
				let newBlocks = [...prevBlocks]
				sortedIndices.forEach((index) => {
					newBlocks.splice(index, 1)
				})

				// Adjust target index based on removed blocks
				let adjustedTarget = targetIndex
				sortedIndices.forEach((index) => {
					if (index < targetIndex) {
						adjustedTarget--
					}
				})

				// Insert blocks at the target position
				newBlocks.splice(adjustedTarget, 0, ...movedBlocks)

				const updatedPage = {
					config: {
						buildingBlocks: newBlocks,
					},
					environment: props.environment,
					id: props.id,
					linkedPageId: props.linkedPageId,
					name: props.name,
					origin: props.origin,
					type: props.type,
				}

				dispatch(updateBlock(updatedPage))
				return newBlocks
			})

			// Clear selection after moving
			setSelectedBlocks([])
			setIsDragging(false)
		},
		[dispatch, props],
	)

	const handleSelectionStart = useCallback((index: number) => {
		setSelectionRange({ start: index, end: index })
		setSelectedBlocks([index])
	}, [])

	const handleSelectionEnd = useCallback(
		(index: number) => {
			if (selectionRange) {
				const start = Math.min(selectionRange.start, index)
				const end = Math.max(selectionRange.start, index)
				const newSelection = Array.from({ length: end - start + 1 }, (_, i) => start + i)
				setSelectedBlocks(newSelection)
				setSelectionRange(null)
			}
		},
		[selectionRange],
	)

	const handleSelect = useCallback((index: number, multiSelect: boolean) => {
		setSelectedBlocks((prev) => {
			if (multiSelect) {
				// Toggle selection if already selected
				if (prev.includes(index)) {
					return prev.filter((i) => i !== index)
				}
				// Add to selection
				return [...prev, index].sort((a, b) => a - b)
			}
			// Single select
			return [index]
		})
	}, [])

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

	// Handle clicks outside blocks
	const handleClickOutside = useCallback((e: React.MouseEvent) => {
		if ((e.target as HTMLElement).classList.contains("grow")) {
			setSelectedBlocks([])
			setSelectionRange(null)
		}
	}, [])

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (mode === "editing") {
				// Select all blocks with Ctrl/Cmd + A
				if ((e.ctrlKey || e.metaKey) && e.key === "a") {
					e.preventDefault()
					setSelectedBlocks(Array.from({ length: blocks.length }, (_, i) => i))
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [blocks.length, mode])

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
								<DraggableBlock
									key={block.id}
									block={block}
									index={index}
									moveBlocks={moveBlocks}
									mode={mode}
									isSelected={selectedBlocks.includes(index)}
									onSelect={handleSelect}
									selectedBlocks={selectedBlocks}
									onSelectionStart={handleSelectionStart}
									onSelectionEnd={handleSelectionEnd}
									isDraggingAny={isDragging}
								/>
							))}
						</m.div>
					</LazyMotion>
				</div>
				<div
					className="grow min-h-[150px]"
					onClick={(e) => {
						handleClickOutside(e)
						activateSelector()
					}}
				/>
			</div>
		</DndProvider>
	)
}
