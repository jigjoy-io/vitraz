import React from "react"
import BlockFactory from "./block-factory"
import gaps from "../style-helper/gaps"

export default class PlainBlockFactory extends React.Component {
	static validBlocks = ["text", "h2", "h1", "image", "page.display"]

	static getBlock(props: any) {
		let validBlock = this.validBlocks.includes(props.type)
		let block = <></>

		if (validBlock) {
			block = BlockFactory.get(props)
			const gap = gaps[props.type]
			block = <div className={`${gap}`}>{block}</div>
		}

		return block
	}
}
