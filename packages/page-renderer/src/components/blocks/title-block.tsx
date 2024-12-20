import React, { lazy } from "react"

const Title = lazy(() => import("ui-library/Title"))

export default function TitleBlock(props) {
	return (
		<div className="py-3">
			<Title {...props} />
		</div>
	)
}
