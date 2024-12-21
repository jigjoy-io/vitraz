import React, { useEffect, useState } from "react"
import { LazyMotion, m } from "framer-motion"
import BlockFactory from "../factories/block-factory"

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

export default function PageContent(props: any) {
	const [blocks, setBlocks] = useState<any[]>(props.config?.buildingBlocks)

	useEffect(() => {
		setBlocks(props.config?.buildingBlocks)
	}, [props.config?.buildingBlocks])

	return (
		<div className="bg-white h-full flex flex-col break-words md:max-w-[360px]">
			<LazyMotion features={loadFeatures}>
				<m.div variants={animation} initial="hidden" animate="show">
					{blocks.map((block) => (
						<div key={block.id} className="relative">
							{BlockFactory.createBlock({ ...block, onPageSwitch: props.onPageSwitch })}
						</div>
					))}
				</m.div>
			</LazyMotion>
			<div className="grow min-h-[150px]" />
		</div>
	)
}
