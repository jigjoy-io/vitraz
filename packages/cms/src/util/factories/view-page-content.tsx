import React, { useEffect, useState } from "react"
import { LazyMotion, m } from "framer-motion"
import { useMode } from "../store"
import PlainBlockFactory from "./plain-block-factory"

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

const loadFeatures = () => import("../../util/style-helper/animations").then((res) => res.default)

export default function ViewPageContent(props: any) {
	const [blocks, setBlocks] = useState<any[]>([])
	const mode = useMode()

	useEffect(() => {
		if (props.config?.buildingBlocks) {
			const validBlocks = props.config.buildingBlocks.filter((block) => block !== null)
			setBlocks(validBlocks)
		}
	}, [props.config?.buildingBlocks])

	useEffect(() => {
		console.log("BLOCKS", props)
	}, [])

	return (
		<div className="bg-white h-full flex flex-col break-words">
			<LazyMotion features={loadFeatures}>
				<m.div variants={animation} initial="hidden" animate="show">
					{blocks.map((block) => (
						<div key={block.id} className="relative">
							{PlainBlockFactory.getBlock({ ...block })}
						</div>
					))}
				</m.div>
			</LazyMotion>
		</div>
	)
}
