import React, { lazy, Suspense } from "react"

const Title = lazy(() => import("@jigjoy-ui/title"))

export default function TitleBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Title {...props} />
			</Suspense>
		</div>
	)
}
