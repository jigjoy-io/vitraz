import React, { lazy, Suspense, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"
const Button = lazy(() => import("renderer/Button"))

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
			<textarea
				className="p-2 rounded-[5px] border w-[400px] mb-2"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<Suspense>
				<Button text="Update" action={update} />
			</Suspense>
		</div>
	)
}
