import React, { lazy } from "react"

const Question = lazy(() => import("ui-library/Question"))

export default function QuestionBlock(props) {
	return (
		<div className="py-3">
			<Question {...props} />
		</div>
	)
}
