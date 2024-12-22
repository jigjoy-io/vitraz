import React from "react"
import Title from "./components/title"
import Heading from "./components/heading"
import Text from "./components/text"
import Button from "./components/button"

function App() {
	return (
		<div className="m-5 text-xl">
			<div className="py-4">
				<Title text="Title" />
				<hr />
				<p className="py-3">Serves as the main page title to grab attention.</p>

				<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
					<div className="text-[gray] pb-2">Example</div>
					<Title text="Welcome to JigJoy!" />
				</div>
			</div>

			<div className="py-4">
				<Title text="Heading" />
				<hr />
				<p className="py-3">Serves as a section heading to introduce specific topics or subsections.</p>

				<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
					<div className="text-[gray] pb-2">Example</div>
					<Heading text="Features and Benefits" />
				</div>
			</div>

			<div className="py-4">
				<Title text="Text" />
				<hr />
				<p className="py-3">Serves to display body content or paragraphs of text.</p>

				<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
					<div className="text-[gray] pb-2">Example</div>
					<Text text="The quick brown fox jumps over the lazy dog." />
				</div>
			</div>

			<div className="py-4">
				<Title text="Button" />
				<hr />
				<p className="py-3">Provides a clickable element that performs a specified action when clicked.</p>

				<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
					<div className="text-[gray] pb-2">Example</div>
					<Button text="Click me 🦄" action={() => alert("click")} />
				</div>
			</div>
		</div>
	)
}

export default App
