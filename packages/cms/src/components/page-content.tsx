import React, { useEffect, useState } from "react"
import { LazyMotion, m } from "framer-motion"
import { useCurrentCarouselPage, useMode, usePage } from "../util/store"
import { appendBlock, focusBlock, updateBlock } from "../reducers/page-reducer"
import { useDispatch } from "react-redux"
import { useDrop } from "react-dnd"
import EditorFactory from "../util/factories/editor-factory"
import TemplateFactory from "../util/factories/templates/template-factory"

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

const loadFeatures = () => import("../util/style-helper/animations").then((res) => res.default)

export default function PageContent(props: any) {
	const mode = useMode()
	const dispatch = useDispatch()
	const [blocks, setBlocks] = useState<any[]>([])
	const page = usePage()
	const activeCarousel = useCurrentCarouselPage()
	const [dropTarget, setDropTarget] = useState<{ index: number; position: "top" | "bottom" } | null>(null)

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

	const [{ isOver, canDrop }, drop] = useDrop<any, void, { isOver: boolean; canDrop: boolean }>(
		() => ({
			accept: "BLOCK",
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
			hover(item, monitor) {
				const dragRect = monitor.getSourceClientOffset()
				if (!dragRect) return

				const hoverElements = document.elementsFromPoint(dragRect.x, dragRect.y)
				const blockElement = hoverElements.find((el) => el.getAttribute("data-block-index"))

				if (blockElement) {
					const hoverIndex = parseInt(blockElement.getAttribute("data-block-index") || "0")
					const hoverRect = blockElement.getBoundingClientRect()
					const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2
					const clientOffset = monitor.getClientOffset()

					if (!clientOffset) return

					const hoverClientY = clientOffset.y - hoverRect.top
					const position = hoverClientY < hoverMiddleY ? "top" : "bottom"

					if (!dropTarget || dropTarget.index !== hoverIndex || dropTarget.position !== position) {
						setDropTarget({ index: hoverIndex, position })
					}
				} else {
					setDropTarget(null)
				}
			},
			drop(item, monitor) {
				if (!dropTarget) return

				const dragIndex = item.block.index
				const hoverIndex = dropTarget.index

				if (dragIndex === hoverIndex) return

				const targetIndex = dropTarget.position === "top" ? hoverIndex : hoverIndex + 1

				const filteredBlocks = blocks.filter((block) => block !== null)
				const [movedBlock] = filteredBlocks.splice(dragIndex, 1)
				filteredBlocks.splice(targetIndex, 0, movedBlock)

				const carouselPage = findPageById(page, activeCarousel)

				if (carouselPage) {
					dispatch(
						updateBlock({
							...carouselPage,
							config: {
								...carouselPage.config,
								buildingBlocks: filteredBlocks,
							},
						}),
					)
				} else {
					dispatch(
						updateBlock({
							...page,
							config: {
								...page.config,
								buildingBlocks: filteredBlocks,
							},
						}),
					)
				}

				setDropTarget(null)
			},
		}),
		[blocks, page, dropTarget],
	)

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

	const ativateSelector = () => {
		if (blocks.length != 0 && blocks[blocks.length - 1].type == "block-selector") {
			dispatch(focusBlock(blocks[blocks.length - 1].id))
		} else {
			let selector = TemplateFactory.createBlockSelector()

			dispatch(
				appendBlock({
					pageId: props.id,
					block: selector,
				}),
			)
		}
	}

	return (
		<div className="bg-white h-full flex flex-col break-words">
			<div className={`relative ${isOver && canDrop ? "bg-gray-50" : ""}`} ref={drop}>
				<LazyMotion features={loadFeatures}>
					<m.div variants={animation} initial="hidden" animate="show">
						{blocks.map((block, index) => (
							<div key={block.id} data-block-index={index} className="relative">
								{dropTarget?.index === index && dropTarget.position === "top" && <div className="pointer-events-none" style={getDropIndicatorStyle("top")} />}

								<div
									className={`
                                    relative 
                                    ${dropTarget?.index === index ? "z-10" : ""}
                                `}
								>
									{React.cloneElement(
										EditorFactory.getEditableBlock({
											...block,
											index,
											mode,
										}),
									)}
								</div>

								{dropTarget?.index === index && dropTarget.position === "bottom" && <div className="pointer-events-none" style={getDropIndicatorStyle("bottom")} />}
							</div>
						))}
					</m.div>
				</LazyMotion>
			</div>
			<div className="grow min-h-[150px]" onClick={ativateSelector}></div>
		</div>
	)
}
