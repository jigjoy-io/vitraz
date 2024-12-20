import React, { lazy, Suspense } from "react"

const CarouselTile = lazy(() => import("ui-library/CarouselTile"))

export default function CarouselTileBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<CarouselTile {...props} />
			</Suspense>
		</div>
	)
}
