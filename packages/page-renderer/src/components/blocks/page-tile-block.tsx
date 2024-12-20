import React, { lazy } from "react"

const PageTile = lazy(() => import("ui-library/PageTile"))

export default function PageTileBlock(props) {
	return (
		<div className="py-3">
			<PageTile {...props} />
		</div>
	)
}
