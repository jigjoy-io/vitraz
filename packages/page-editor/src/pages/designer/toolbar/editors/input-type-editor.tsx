import React, { lazy, Suspense, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"
import Item from "../../../../components/item/item"
const Button = lazy(() => import("renderer/Button"))

const positions = [
	{ text: "Text", key: "text" },
	{ text: "Date", key: "date" },
	{ text: "Number", key: "number" },
]

export default function InputTypeEditor(props: any) {
	const [value, setValue] = useState(props.value)
	const dispatch = useDispatch()

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
			<Suspense>
				<Button text="Update" action={update} />
			</Suspense>
		</div>
	)
}
