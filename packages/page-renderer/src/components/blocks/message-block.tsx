import React, { lazy } from "react"

const Message = lazy(() => import("ui-library/Message"))

export default function MessageBlock(props) {
	return (
		<div className="py-3">
			<Message {...props} />
		</div>
	)
}
