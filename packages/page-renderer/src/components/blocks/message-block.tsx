import React, { lazy, Suspense } from "react"

const Message = lazy(() => import("@jigjoy-ui/message"))

export default function MessageBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Message {...props} />
			</Suspense>
		</div>
	)
}
