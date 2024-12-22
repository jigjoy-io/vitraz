import React, { lazy, Suspense } from "react"

const Video = lazy(() => import("@jigjoy-ui/video"))

export default function VideoBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Video {...props} />
			</Suspense>
		</div>
	)
}
