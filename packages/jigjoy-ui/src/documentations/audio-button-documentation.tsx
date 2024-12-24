import React from "react"
import Title from "../components/title"
import AudioButton from "../components/audio-button"

export default function AudioButtonDocumentation() {
	return (
		<div className="py-4">
			<Title text="Audio Button" />
			<hr />
			<p className="py-3">A clickable element that plays a specific sound or audio file when activated.</p>

			<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
				<div className="text-[gray] pb-2">Example</div>
				<AudioButton id="example" source="https://s3.eu-west-1.amazonaws.com/jigjoy.io/joyful-snowman.mp3" />
			</div>
		</div>
	)
}
