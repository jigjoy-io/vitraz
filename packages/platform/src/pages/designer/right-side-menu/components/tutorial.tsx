import React from "react"
import Reel from "../../../../components/reel/reel"
import Heading from "../../../../components/heading/heading"

export default function Tutorial() {
	return (
		<div className="flex flex-col justify-center items-center gap-3">
			<Heading position="center" text="Platform Tutorial" />
			<div className="p-16">
				<Reel source="https://jigjoy.io/assets/jigjoy-platform-demo.mp4" />
			</div>
		</div>
	)
}
