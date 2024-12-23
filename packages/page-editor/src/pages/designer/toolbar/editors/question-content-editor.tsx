import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"

export default function QuestionContentEditor(props: any) {
	const [value, setValue] = useState(props.value)

	const dispatch = useDispatch()

	const handleChange = (key, newValue) => {
		let content = JSON.parse(JSON.stringify(value))
		content[key] = newValue
		setValue(content)
	}

	useEffect(() => {
		const block = { ...props.block }
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}, [value])

	const handleImageChange = (url) => {
		handleChange("image", url)
	}

	return (
		<div className="flex flex-col p-2 w-[300px] mt-4">
			<div className="pb-4">
				<Checkbox id="displayQuestion" selected={value.displayQuestion} onChange={handleChange}>
					Display question text
				</Checkbox>
			</div>

			<input
				className="p-1 rounded-[5px] border w-[100%] mb-8"
				value={value.text}
				onChange={(e: any) => handleChange("text", e.target.value)}
			/>

			<Checkbox id="displayImage" selected={value.displayImage} onChange={handleChange}>
				Display question image
			</Checkbox>
			<img src={value.image} className="w-[100px] my-2 rounded-[5px]" />
			<div className="flex gap-3 mt-3">
				<Tabs>
					<Tab key="Upload image">
						<FileUploader mediaType="image" callback={handleImageChange} />
					</Tab>
					<Tab key="Embed link">
						<FileUrlEditor filePath={value.image} fileType="image" callback={handleImageChange} />
					</Tab>
				</Tabs>
			</div>
		</div>
	)
}
