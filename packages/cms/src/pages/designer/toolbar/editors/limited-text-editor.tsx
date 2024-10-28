import React, { useState } from "react"
import { useDispatch } from "react-redux"
import LocalizedStrings from "react-localization"
import Button from "../../../../components/button/button"
import { updateBlock } from "../../../../reducers/page-reducer"

let localization = new LocalizedStrings({
	US: {
		update: "Update",
	},
	RS: {
		update: "Promeni",
	},
})

export default function LimitedTextEditor(props: any) {
	const [value, setValue] = useState(props.value)
	const [limit, setLimit] = useState(props.extraProps.limit)

	const dispatch = useDispatch()
	localization.setLanguage(props.lang)

	const update = () => {
		let block = JSON.parse(JSON.stringify(props.block))
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}

	return (
		<div className="flex flex-col p-2">
			<input className="p-2 rounded-lg border w-[100%] mb-2" value={value} maxLength={limit} onChange={(event) => setValue(event.target.value)} />
			<div className="text-xs mb-2 gray-400">
				<span className="float-right">
					{value.length} / {limit}
				</span>
			</div>
			<Button text={localization.update} action={update} />
		</div>
	)
}
