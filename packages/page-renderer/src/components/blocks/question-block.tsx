import React, { lazy, Suspense } from "react"

const Question = lazy(() => import("@jigjoy-ui/question"))

export default function QuestionBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Question {...props} />
			</Suspense>
		</div>
	)
}
