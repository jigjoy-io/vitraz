import React, { lazy, Suspense } from "react"

const CarouselTile = lazy(() => import("@jigjoy-ui/carousel-tile"))

export default function CarouselTileBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<CarouselTile {...props} />
			</Suspense>
		</div>
	)
}
