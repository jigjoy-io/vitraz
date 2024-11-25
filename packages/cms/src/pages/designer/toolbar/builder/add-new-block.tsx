import React from "react"
import { useDispatch } from "react-redux"
import ToolbarButtonWrapper from "../toolbar-button-wrapper"
import { insertBlock } from "../../../../reducers/page-reducer"
import TemplateFactory from "../../../../util/factories/templates/template-factory"
import AddBlockIcon from "../../../../icons/add-block-icon"

export function AddNewBlock(props) {
	const dispatch = useDispatch()

	const tooltip = (
		<div className="text-center text-[14px]">
			<div>
				<span className="font-extrabold">Click</span> to add below
			</div>
			<span className="font-extrabold">Ctrl-click</span> to add block above
		</div>
	)

	const addSelector = (e: any) => {
		let position = "below"
		if (e.ctrlKey) {
			position = "above"
		}

		let selector = TemplateFactory.createBlockSelector()

		dispatch(
			insertBlock({
				referenceBlock: props.id,
				block: selector,
				position: position,
			}),
		)
	}

	return (
		<div onClick={addSelector}>
			<ToolbarButtonWrapper tooltip={tooltip}>
				<AddBlockIcon />
			</ToolbarButtonWrapper>
		</div>
	)
}
