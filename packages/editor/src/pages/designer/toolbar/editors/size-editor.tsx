import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"
import Checkbox from "../../../../components/checkbox/checkbox"
import Button from "../../../../components/button/button"

const sizes = [
	{ text: "Small", key: "small" },
	{ text: "Medium", key: "medium" },
	{ text: "Large", key: "large" },
]

export default function SizeEditor(props: any) {
	const [value, setValue] = useState(props.value)
	const dispatch = useDispatch()

	const update = () => {
		let block = JSON.parse(JSON.stringify(props.block))
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}

	return (
		<div className="flex flex-col p-2">
			<div className="pb-3 w-[150px]">
				{sizes.map((size: any) => (
					<div className="py-2">
						<Checkbox selected={value == size.key} onChange={() => setValue(size.key)}>
							{size.text}
						</Checkbox>
					</div>
				))}
			</div>
			<Button text="Update" action={update} />
		</div>
	)
}
