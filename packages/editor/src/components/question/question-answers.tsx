import React from "react"
import { useState } from "react"
import Alert from "../alert/alert"
import Button from "../button/button"
import Item from "../item/item"
import { motion, AnimatePresence } from "framer-motion"

function QuestionAnswers(props: any) {
	const [selected, setSelected] = useState({} as any)
	const [alert, setAlert] = useState({})
	const [answered, setAnswered] = useState(false)

	const selectAnswer = (event, outcome: any) => {
		setAnswered(false)
		setSelected(outcome)
	}

	const checkAnswer = () => {
		if (selected.correct) {
			setAlert(props.outcomes.correct)
			correctSound.play()
			setAnswered(true)
		} else {
			setAlert(props.outcomes.incorrect)
			incorrectSound.play()
			setAnswered(true)
		}
	}

	const correctSound = new Audio("/public/audio/correct_answer.mp3")
	const incorrectSound = new Audio("/public/audio/wrong_answer.mp3")

	return (
		<div className="flex flex-col gap-2 mt-3" key={props.id}>
			{props.answers.map((answer: any) => (
				<Item
					tabFocus={false}
					borderOn={true}
					{...answer}
					answered={answered}
					selected={selected.id}
					action={selectAnswer}
				/>
			))}
			<motion.div className="relative mt-2" layout>
				<AnimatePresence mode="popLayout">
					{answered ? (
						<motion.div
							key="alert"
							initial={{ y: 100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 100, opacity: 0 }}
							transition={{
								type: "spring",
								damping: 20,
								stiffness: 300,
								duration: 0.4,
							}}
						>
							<Alert {...alert} />
						</motion.div>
					) : (
						<motion.div
							key="button"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 20, opacity: 0 }}
							transition={{
								type: "spring",
								damping: 25,
								stiffness: 400,
								duration: 0.3,
							}}
						>
							<Button
								text={props.outcomes.confirmationButtonText}
								key={selected.id}
								width="w-full"
								color={selected != null ? "secondary" : "default"}
								action={checkAnswer}
								disabled={selected.id == null}
								rounded
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}

export default QuestionAnswers
