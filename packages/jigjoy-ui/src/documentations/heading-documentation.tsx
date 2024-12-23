import React from "react"
import Heading from "../components/heading"
import Title from "../components/title"

export default function HeadingDocumentation(props: any) {
	return (
		<div className="py-4">
			<Title text="Heading" />
			<hr />
			<p className="py-3">Serves as a section heading to introduce specific topics or subsections.</p>

			<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
				<div className="text-[gray] pb-2">Example</div>
				<Heading text="Features and Benefits" />
			</div>
		</div>
	)
}
