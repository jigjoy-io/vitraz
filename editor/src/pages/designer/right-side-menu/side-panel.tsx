import React from "react"
import Heading from "../../../components/heading/heading"
import Text from "../../../components/text/text"

export default function SidePanel() {
	return (
		<div className="flex flex-col justify-center items-center gap-4 px-10">
			<Heading position="center" text="Dummy Page" />
			<Text position="center" text="This is a dummy page. It is used to show the right side menu." />
		</div>
	)
}
