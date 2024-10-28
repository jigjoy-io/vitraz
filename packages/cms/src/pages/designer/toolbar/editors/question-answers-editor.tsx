import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuid } from "uuid"
import LocalizedStrings from "react-localization"
import { updateBlock } from "../../../../reducers/page-reducer"
import Button from "../../../../components/button/button"
import Checkbox from "../../../../components/checkbox/checkbox"
import CloseIcon from "../../../../icons/close-icon"

let localization = new LocalizedStrings({
	US: {
		update: "Update",
		addAnswer: "Add answer",
		answer: "Answer",
	},
	RS: {
		update: "Promeni",
		addAnswer: "Dodaj odgovor",
		answer: "Odgovor",
	},
})

export default function QuestionAnswersEditor(props: any) {
	const [value, setValue] = useState(props.value)

	const dispatch = useDispatch()
	localization.setLanguage(props.lang)

	const update = () => {
		let block = JSON.parse(JSON.stringify(props.block))
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}

	const addAnswer = () => {
		let answers = JSON.parse(JSON.stringify(value))
		answers.push({ id: uuid(), correct: false, text: `${localization.answer} ${answers.length + 1}` })
		setValue(answers)
	}

	const updateAnswer = (e, index) => {
		let answers = JSON.parse(JSON.stringify(value))
		answers.map((answer: any, i) => {
			i == index ? (answer.text = e.target.value) : answer
		})
		setValue(answers)
	}

	const removeAnswer = (index) => {
		if (value.length == 2) return

		let answers = JSON.parse(JSON.stringify(value))
		answers.splice(index, 1)
		setValue(answers)
	}

	const selectCorrectAnswer = (index) => {
		let answers = JSON.parse(JSON.stringify(value))
		answers.map((answer: any, i) => {
			i == index ? (answer.correct = true) : (answer.correct = false)
		})
		setValue(answers)
	}

	return (
		<div className="flex flex-col p-2 w-[300px] mt-1">
			{value.map((answer: any, index) => (
				<div className="flex my-1 justify-center items-center">
					<Checkbox selected={answer.correct} onChange={() => selectCorrectAnswer(index)} />

					<input className="p-1 rounded-lg border w-[100%]" value={answer.text} onChange={(e) => updateAnswer(e, index)} />
					<div className="ml-2 w-max p-1 h-fit bg-primary-light border-2 border-primary rounded-md cursor-pointer" onClick={() => removeAnswer(index)}>
						<CloseIcon />
					</div>
				</div>
			))}

			<div className="my-1">
				<Button width="w-full" text={localization.addAnswer} color="default" action={addAnswer} />
			</div>
			<Button text={localization.update} action={update} />
		</div>
	)
}
