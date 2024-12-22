import React, { lazy, Suspense } from "react"

const Text = lazy(() => import("@jigjoy-ui/text"))

export default function TextBlock(props) {
	return (
		<div className="py-1">
			<Suspense>
				<Text {...props} />
			</Suspense>
		</div>
	)
}
