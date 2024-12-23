import React, { lazy, Suspense, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"
const Button = lazy(() => import("renderer/Button"))
interface ButtonTexts {
	previous: string
	next: string
	home: string
}

interface MenuEditorProps {
	block: any
	attribute: string
	value?: ButtonTexts
}

export default function ButtonEditor({ block, attribute }: MenuEditorProps) {
	const [buttonTexts, setButtonTexts] = useState<ButtonTexts>(block.page.config.buttons)
	const dispatch = useDispatch()

	const handleInputChange = (key: keyof ButtonTexts, value: string) => {
		setButtonTexts((prev) => ({ ...prev, [key]: value }))
	}

	const update = () => {
		let updatedBlock = JSON.parse(JSON.stringify(block))
		updatedBlock.page.config[attribute] = buttonTexts
		dispatch(updateBlock(updatedBlock))
	}

	return (
		<div className="flex flex-col p-2 w-[300px] mt-4">
			{(Object.entries(buttonTexts) as [keyof ButtonTexts, string][]).map(([key, text]) => (
				<div key={key} className="mb-3">
					<label htmlFor={key} className="block mb-1">
						{key.charAt(0).toUpperCase() + key.slice(1)}:
					</label>
					<input
						id={key}
						className="p-1 rounded-[5px] border w-[100%]"
						value={text}
						onChange={(e) => handleInputChange(key, e.target.value)}
					/>
				</div>
			))}
			<Suspense>
				<Button text="Update" action={update} />
			</Suspense>
		</div>
	)
}
