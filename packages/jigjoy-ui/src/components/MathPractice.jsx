// MathPractice.js
import React, { useState } from "react"
import { motion } from "framer-motion"

const correctSoundUrl = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_29b7d5637f.mp3?filename=correct-answer-127856.mp3"
const incorrectSoundUrl = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_79b7001d9f.mp3?filename=wrong-answer-129481.mp3"

const generateExamples = () => {
	return Array.from({ length: 5 }, () => {
		const num1 = Math.floor(Math.random() * 1000)
		const num2 = Math.floor(Math.random() * (1000 - num1)) // osiguraj da zbir <= 1000
		return { num1, num2, answer: num1 + num2 }
	})
}

const MathPractice = () => {
	const [examples, setExamples] = useState(generateExamples())
	const [responses, setResponses] = useState(Array(5).fill(""))
	const [feedback, setFeedback] = useState(Array(5).fill(null))

	const playSound = (isCorrect) => {
		const audio = new Audio(isCorrect ? correctSoundUrl : incorrectSoundUrl)
		audio.play()
	}

	const handleChange = (index, value) => {
		const newResponses = [...responses]
		newResponses[index] = value
		setResponses(newResponses)
	}

	const checkAnswer = (index) => {
		const isCorrect = parseInt(responses[index], 10) === examples[index].answer
		const newFeedback = [...feedback]
		newFeedback[index] = isCorrect ? "Tačno!" : "Netačno, pokušaj ponovo."
		setFeedback(newFeedback)
		playSound(isCorrect)
	}

	return (
		<div className="p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center font-sans">
			<motion.h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-800" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
				Vežbanje Matematike: Dopuni Jednakost
			</motion.h1>
			<motion.div className="w-full max-w-xs sm:max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6 overflow-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
				<table className="table-fixed w-full border-collapse">
					<thead>
						<tr className="bg-indigo-50">
							<th className="border border-indigo-300 px-2 sm:px-4 py-2 text-indigo-700 w-1/4">Jednačina</th>
							<th className="border border-indigo-300 px-2 sm:px-4 py-2 text-indigo-700 w-1/4">Tvoj Odgovor</th>
							<th className="border border-indigo-300 px-2 sm:px-4 py-2 text-indigo-700 w-1/4">Akcija</th>
							<th className="border border-indigo-300 px-2 sm:px-4 py-2 text-indigo-700 w-1/4">Povratna Informacija</th>
						</tr>
					</thead>
					<tbody>
						{examples.map((example, index) => (
							<motion.tr key={index} className="hover:bg-indigo-100" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
								<td className="border border-indigo-300 px-2 sm:px-4 py-2 text-center text-indigo-900 font-medium">
									{example.num1} + {example.num2} =
								</td>
								<td className="border border-indigo-300 px-2 sm:px-4 py-2 text-center">
									<input type="number" value={responses[index]} onChange={(e) => handleChange(index, e.target.value)} className="border border-indigo-300 rounded-md px-2 sm:px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
								</td>
								<td className="border border-indigo-300 px-2 sm:px-4 py-2 text-center">
									<button onClick={() => checkAnswer(index)} className="bg-indigo-500 text-white px-3 sm:px-4 py-1 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
										Proveri
									</button>
								</td>
								<td className="border border-indigo-300 px-2 sm:px-4 py-2 text-center">
									{feedback[index] && (
										<motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-sm font-medium ${feedback[index] === "Tačno!" ? "text-green-600" : "text-red-600"}`}>
											{feedback[index]}
										</motion.span>
									)}
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</motion.div>
			<motion.button
				onClick={() => {
					setExamples(generateExamples())
					setResponses(Array(5).fill(""))
					setFeedback(Array(5).fill(null))
				}}
				className="mt-4 sm:mt-6 bg-green-500 text-white px-5 sm:px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				Resetuj Primere
			</motion.button>
		</div>
	)
}

export default MathPractice
