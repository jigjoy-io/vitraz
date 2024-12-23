import React from "react"
import Title from "../components/title"
import Button from "../components/button"

export default function ButtonDocumentation() {
	return (
		<div className="py-4">
			<Title text="Button" />
			<hr />
			<p className="py-3">Provides a clickable element that performs a specified action when clicked.</p>

			<div className="bg-[#FBFAF0] rounded-lg p-4 border my-4">
				<div className="text-[gray] pb-2">Example</div>
				<Button text="Click me 🦄" action={() => alert("Hello")} />
			</div>
		</div>
	)
}
