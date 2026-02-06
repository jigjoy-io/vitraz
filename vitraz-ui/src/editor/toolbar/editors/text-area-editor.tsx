import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import { Button, Textarea } from "@jigjoy-io/ui-library"

export default function TextAreaEditor(props: any) {
	const [value, setValue] = useState(props.value)
	const dispatch = useDispatch()

	const update = () => {
		let block = JSON.parse(JSON.stringify(props.block))
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}

	return (
		<div className="flex flex-col p-2">
			<Textarea
				className="p-2 rounded-[5px] border w-[400px] mb-2"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<Button onClick={update}>Update</Button>
		</div>
	)
}
