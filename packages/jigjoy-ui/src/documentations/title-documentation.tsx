import React from "react"
import Title from "../components/title"

export default function TitleDocumentation(props: any) {
	return (
		<div className="py-4">
			<Title text="Title" />
			<hr />
			<p className="py-3">Serves as the main page title to grab attention.</p>

			<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
				<div className="text-[gray] pb-2">Example</div>
				<Title text="Welcome to JigJoy!" />
			</div>
		</div>
	)
}
