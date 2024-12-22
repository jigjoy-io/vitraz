import React, { lazy, Suspense } from "react"

const Heading = lazy(() => import("@jigjoy-ui/heading"))

export default function HeadingBlock(props) {
	return (
		<div className="py-2">
			<Suspense>
				<Heading {...props} />
			</Suspense>
		</div>
	)
}
