import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"
import Tabs from "../../../../components/tabs/tabs"
import Tab from "../../../../components/tabs/tab"
import Button from "../../../../components/button/button"

export default function QuestionOutcomesEditor(props: any) {
	const [value, setValue] = useState(props.value)

	const dispatch = useDispatch()

	const update = () => {
		let block = JSON.parse(JSON.stringify(props.block))
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}

	const handleOutcomeChange = (selected, key, newValue) => {
		let outcomes = JSON.parse(JSON.stringify(value))
		outcomes[selected][key] = newValue
		setValue(outcomes)
	}

	const handleButtonChange = (key, newValue) => {
		let outcomes = JSON.parse(JSON.stringify(value))
		outcomes[key] = newValue
		setValue(outcomes)
	}

	return (
		<div className="flex flex-col p-2 w-[350px] mt-1">
			<div>Confirmation button text: </div>
			<input
				className="p-1 mt-2 rounded-[5px] border w-[100%] mb-3"
				value={value.confirmationButtonText}
				onChange={(e: any) => handleButtonChange("confirmationButtonText", e.target.value)}
			/>

			<div className="h-max">
				<Tabs>
					<Tab key="Correct answer">
						<div>Title: </div>
						<input
							className="p-1 mt-2 rounded-[5px] border w-[100%] mb-3"
							value={value.correct.title}
							onChange={(e: any) => handleOutcomeChange("correct", "title", e.target.value)}
						/>
						<div>Message: </div>
						<textarea
							className="p-1 mt-1 rounded-[5px] border w-[100%]"
							value={value.correct.message}
							onChange={(e: any) => handleOutcomeChange("correct", "message", e.target.value)}
						/>
					</Tab>

					<Tab key="Incorrect answer">
						<div>Title: </div>
						<input
							className="p-1 mt-2 rounded-[5px] border w-[100%] mb-3"
							value={value.incorrect.title}
							onChange={(e: any) => handleOutcomeChange("incorrect", "title", e.target.value)}
						/>
						<div>Message: </div>
						<textarea
							className="p-1 mt-1 rounded-[5px] border w-[100%]"
							value={value.incorrect.message}
							onChange={(e: any) => handleOutcomeChange("incorrect", "message", e.target.value)}
						/>
					</Tab>
				</Tabs>
			</div>

			<Button text="Update" action={update} />
		</div>
	)
}
