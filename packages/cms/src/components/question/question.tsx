import React from "react"
import QuestionAnswers from "./question-answers"
import QuestionContent from "./question-content"

export default function Question(props: any) {
	return (
		<>
			<QuestionContent content={props.content} />
			<QuestionAnswers {...props} />
		</>
	)
}
