import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"
import LeftAlignmentIcon from "../../../../icons/alignment-left-icon"
import RightAlignmentIcon from "../../../../icons/alignment-right-icon"
import CenterAlignmentIcon from "../../../../icons/alignment-center-icon"
import Item from "../../../../components/item/item"
import Button from "../../../../components/button/button"

export default function PositionEditor(props: any) {
	const [value, setValue] = useState(props.value)
	const dispatch = useDispatch()

	let positions = [
		{ text: "Left", key: "left", icon: LeftAlignmentIcon },
		{ text: "Center", key: "center", icon: CenterAlignmentIcon },
		{ text: "Right", key: "right", icon: RightAlignmentIcon },
	]

	const update = () => {
		let block = JSON.parse(JSON.stringify(props.block))
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}

	const select = (event, option) => {
		setValue(option.id)
	}

	return (
		<div className="flex flex-col p-2">
			<div className="pb-3">
				{positions.map((position: any) => (
					<Item
						tabFocus={false}
						text={position.text}
						icon={position.icon}
						id={position.key}
						selected={value}
						action={select}
					/>
				))}
			</div>
			<Button text="Update" action={update} />
		</div>
	)
}
