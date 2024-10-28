import React, { lazy, Suspense } from "react"

const EditingBlock = lazy(() => import("./editing-block"))
const ViewOnlyBlock = lazy(() => import("./view-only-block"))

export default class VistorFactory extends React.Component {
	static blocks: any = {
		editing: {
			component: EditingBlock,
		},
		visiting: {
			component: ViewOnlyBlock,
		},
	}

	static getVisitingBlock(mode: any, blockConfig: any) {
		let block: any = this.blocks[mode]

		return (
			<Suspense>
				<block.component {...blockConfig} />
			</Suspense>
		)
	}
}
