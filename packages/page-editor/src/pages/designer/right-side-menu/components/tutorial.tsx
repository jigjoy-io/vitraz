import React from "react"
import Reel from "../../../../components/reel/reel"

export default function Tutorial() {
	return (
		<div className="flex flex-col justify-center items-center gap-3">
			<div className="text-center">
				<p className="text-heading">Platform Tutorial</p>
			</div>
			<div className="p-16">
				<Reel source="https://jigjoy.io/assets/jigjoy-platform-demo.mp4" />
			</div>
		</div>
	)
}
