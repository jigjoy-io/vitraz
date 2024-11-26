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

	const { DragSelection } = useSelectionContainer({
		onSelectionStart: () => dispatch(selectBlocks([])),
		onSelectionChange: (selectionBox) => setBoxSelection(selectionBox),
		onSelectionEnd: () => {
			const finalizedSelection = blocks.filter((block) => {
				const blockElement = document.querySelector(`[id="${block.id}"]`)
				if (!blockElement) return false

				const rect = blockElement.getBoundingClientRect()
				const blockBox = { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
				return boxesIntersect(boxSelection, blockBox)
			})

			dispatch(selectBlocks(finalizedSelection))
		},
		selectionProps: { className: "bg-blue-100" },
	})

	const handleClick = () => {
		dispatch(selectBlocks([]))
	}

	const { isOver, canDrop, drop, dropTarget } = useBlockDropHandler({
		blocks,
		selectedBlocks,
		page,
		activeCarousel,
		dispatch,
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
			<div className={`relative ${isOver && canDrop ? "bg-gray-50" : ""}`} ref={drop}>
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
								{/* Drop indicator for "top" */}
								{dropTarget?.block?.id === block.id && dropTarget?.position === "top" && (
									<div className="pointer-events-none" style={getDropIndicatorStyle("top")} />
								)}
								{/* Render the editable block */}
								{EditorFactory.getEditableBlock(block)}
								{/* Drop indicator for "bottom" */}
								{dropTarget?.block?.id === block.id && dropTarget?.position === "bottom" && (
									<div className="pointer-events-none" style={getDropIndicatorStyle("bottom")} />
								)}
							</div>
						))}
					</m.div>
				</LazyMotion>
			</div>
			<div className="grow min-h-[150px]" onClick={activateSelector}></div>
		</div>
	)
}
