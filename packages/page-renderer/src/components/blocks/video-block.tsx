import React, { lazy } from "react"

const Video = lazy(() => import("ui-library/Video"))

export default function VideoBlock(props) {
	return (
		<div className="py-3">
			<Video {...props} />
		</div>
	)
}
