import React, { lazy, Suspense } from "react"

const Audio = lazy(() => import("@jigjoy-ui/audio-button"))

export default function AudioBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Audio {...props} />
			</Suspense>
		</div>
	)
}
