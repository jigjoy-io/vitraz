import React from "react"
import Title from "../components/title"
import Text from "../components/text"

export default function HeadingDocumentation(props: any) {
	return (
		<div className="py-4">
			<Title text="Text" />
			<hr />
			<p className="py-3">Serves to display body content or paragraphs of text.</p>

			<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
				<div className="text-[gray] pb-2">Example</div>
				<Text text="The quick brown fox jumps over the lazy dog." />
			</div>
		</div>
	)
}
