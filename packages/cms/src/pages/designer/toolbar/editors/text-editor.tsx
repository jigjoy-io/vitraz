import React, { useState } from "react"
import { useDispatch } from "react-redux"
import LocalizedStrings from "react-localization"
import { updateBlock } from "../../../../reducers/page-reducer"
import Button from "../../../../components/button/button"

let localization = new LocalizedStrings({
	US: {
		update: "Update",
	},
	RS: {
		update: "Promeni",
	},
})

export default function TextEditor(props: any) {
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
			<input className="p-2 rounded-lg border w-[100%] mb-2" value={value} onChange={(event) => setValue(event.target.value)} />
			<Button text={localization.update} action={update} />
		</div>
	)
}
