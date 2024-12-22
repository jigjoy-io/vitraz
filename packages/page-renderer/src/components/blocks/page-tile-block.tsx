import React, { lazy, Suspense } from "react"

const PageTile = lazy(() => import("@jigjoy-ui/page-tile"))

export default function PageTileBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<PageTile {...props} />
			</Suspense>
		</div>
	)
}
