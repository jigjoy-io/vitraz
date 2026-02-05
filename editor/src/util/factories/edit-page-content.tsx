import React, { useEffect, useState } from "react"
import { LazyMotion, m } from "framer-motion"
import { useDispatch } from "react-redux"
import { appendBlock, focusBlock } from "../../reducers/page-reducer"
import { useSelectedBlocks } from "../store"
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
	const selectedBlocks = useSelectedBlocks()

	useEffect(() => {
		if (props.config?.buildingBlocks) {
			const validBlocks = props.config.buildingBlocks.filter((block) => block !== null)
			setBlocks(validBlocks)
		}
	}, [props.config?.buildingBlocks])

	const activateSelector = () => {
		if (blocks.length !== 0 && blocks[blocks.length - 1].type === "block-selector") {
			dispatch(focusBlock(blocks[blocks.length - 1].id))
		} else {
			const selector = TemplateFactory.createBlockSelector()
			dispatch(appendBlock({ pageId: props.id, block: selector }))
		}
	}

	return (
		<div className="bg-white h-full flex flex-col break-words">
			<div className={`relative flex items-center justify-center`}>
				<div className="flex flex-col w-full md:max-w-full">
					<LazyMotion features={loadFeatures}>
						<m.div variants={animation} initial="hidden" animate="show">
							{blocks.map((block) => (
								<div
									key={block.id}
									id={block.id}
									data-block-id={block.id}
									className={`relative ${
										selectedBlocks.some((selectedBlock) => selectedBlock.id === block.id)
											? "bg-highlight rounded-lg"
											: ""
									}`}
								>
									{EditorFactory.getEditableBlock(block)}
								</div>
							))}
						</m.div>
					</LazyMotion>
				</div>
			</div>
			<div className="grow min-h-[150px]" onClick={activateSelector}></div>
		</div>
	)
}
