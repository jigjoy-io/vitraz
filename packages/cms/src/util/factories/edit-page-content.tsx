import React, { useEffect, useState } from "react"
import { LazyMotion, m } from "framer-motion"
import { useDispatch } from "react-redux"
import { appendBlock, focusBlock } from "../../reducers/page-reducer"
import { useCurrentCarouselPage, usePage, useSelectedBlocks } from "../store"
import { selectBlocks } from "../../reducers/editor-reducer"
import { boxesIntersect, useSelectionContainer } from "@air/react-drag-to-select"
import { useBlockDropHandler } from "../drag-and-drop/block-drop-handler"
import TemplateFactory from "./templates/template-factory"
import EditorFactory from "./editor-factory"
import { CustomDragLayer } from "../../components/custom-drag-layer/custom-drag-layer"

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

const loadFeatures = () => import("../style-helper/animations").then((res) => res.default)

export default function EditPageContent(props: any) {
	const [blocks, setBlocks] = useState<any[]>([])
	const dispatch = useDispatch()
	const page = usePage()
	const selectedBlocks = useSelectedBlocks()
	const activeCarousel = useCurrentCarouselPage()
	const [boxSelection, setBoxSelection] = useState<any>()
	const [isDragging, setIsDragging] = useState(false)

	const { DragSelection, cancelCurrentSelection } = useSelectionContainer({
		onSelectionStart: () => {
			if (isDragging) return
			dispatch(selectBlocks([]))
			setBoxSelection(null)
		},
		onSelectionChange: (selectionBox) => {
			if (isDragging) return
			setBoxSelection(selectionBox)
		},
		onSelectionEnd: () => {
			if (isDragging) return
			const finalizedSelection = blocks.filter((block) => {
				const blockElement = document.querySelector(`[id="${block.id}"]`)
				if (!blockElement) return false

				const rect = blockElement.getBoundingClientRect()
				const blockBox = { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
				return boxesIntersect(boxSelection, blockBox)
			})

			dispatch(selectBlocks(finalizedSelection))
			setBoxSelection(null)
		},
		selectionProps: { className: "bg-blue-100" },
	})

	const handleClick = () => {
		dispatch(selectBlocks([]))
		setBoxSelection(null)
		cancelCurrentSelection()
	}

	const { isOver, canDrop, drop, dropTarget } = useBlockDropHandler({
		blocks,
		selectedBlocks,
		page,
		activeCarousel,
		dispatch,
		setIsDragging,
		cancelCurrentSelection,
	})

	useEffect(() => {
		if (props.config?.buildingBlocks) {
			const validBlocks = props.config.buildingBlocks.filter((block) => block !== null)
			setBlocks(validBlocks)
		}
	}, [props.config?.buildingBlocks])

	const getDropIndicatorStyle = (position: "top" | "bottom"): React.CSSProperties => ({
		position: "absolute",
		left: 0,
		right: 0,
		height: "4px",
		backgroundColor: "#F472B6",
		transform: "scaleX(0.98)",
		transition: "transform 150ms ease",
		...(position === "top" ? { top: "-2px" } : { bottom: "-2px" }),
	})

	const activateSelector = () => {
		if (blocks.length !== 0 && blocks[blocks.length - 1].type === "block-selector") {
			dispatch(focusBlock(blocks[blocks.length - 1].id))
		} else {
			const selector = TemplateFactory.createBlockSelector()
			dispatch(appendBlock({ pageId: props.id, block: selector }))
		}
	}

	return (
		<div className="bg-white h-full flex flex-col break-words" onClick={handleClick}>
			<div
				className={`relative ${isOver && canDrop ? "bg-gray-50" : ""}w-[500px] flex items-center justify-center`}
				ref={drop}
			>
				<div className="flex flex-col w-full md:max-w-[360px] p-3">
					<LazyMotion features={loadFeatures}>
						<m.div variants={animation} initial="hidden" animate="show">
							<DragSelection />
							{blocks.map((block) => (
								<div
									key={block.id}
									id={block.id}
									data-block-id={block.id}
									className={`relative ${
										selectedBlocks.some((selectedBlock) => selectedBlock.id === block.id) ? "bg-highlight" : ""
									}`}
								>
									{dropTarget?.block?.id === block.id && dropTarget?.position === "top" && (
										<div className="pointer-events-none" style={getDropIndicatorStyle("top")} />
									)}
									{EditorFactory.getEditableBlock(block)}
									{dropTarget?.block?.id === block.id && dropTarget?.position === "bottom" && (
										<div className="pointer-events-none" style={getDropIndicatorStyle("bottom")} />
									)}
								</div>
							))}
						</m.div>
					</LazyMotion>
				</div>
			</div>
			<CustomDragLayer selectedBlocks={selectedBlocks} />
			<div className="grow min-h-[150px]" onClick={activateSelector}></div>
		</div>
	)
}
