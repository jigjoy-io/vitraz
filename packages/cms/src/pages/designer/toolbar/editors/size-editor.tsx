import React, { useState } from "react"
import { useDispatch } from "react-redux"
import LocalizedStrings from "react-localization"
import { updateBlock } from "../../../../reducers/page-reducer"
import Checkbox from "../../../../components/checkbox/checkbox"
import Button from "../../../../components/button/button"

let localization = new LocalizedStrings({
	US: {
		update: "Update",
		sizes: [
			{ text: "Small", key: "small" },
			{ text: "Medium", key: "medium" },
			{ text: "Large", key: "large" },
		],
	},
	RS: {
		update: "Promeni",
		sizes: [
			{ text: "Mala", key: "small" },
			{ text: "Srednja", key: "medium" },
			{ text: "Velika", key: "large" },
		],
	},
})

export default function SizeEditor(props: any) {
	const [value, setValue] = useState(props.value)
	const dispatch = useDispatch()
	localization.setLanguage(props.lang)

	const update = () => {
		let block = JSON.parse(JSON.stringify(props.block))
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}

	return (
		<div className="flex flex-col p-2">
			<div className="pb-3 w-[150px]">
				{localization.sizes.map((size: any) => (
					<div className="py-2">
						<Checkbox selected={value == size.key} onChange={() => setValue(size.key)}>
							{size.text}
						</Checkbox>
					</div>
				))}
			</div>
			<Button text={localization.update} action={update} />
		</div>
	)
}
