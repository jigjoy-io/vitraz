import React from "react"

export default function Tutorial() {
	const TUTORIAL_SRC = process.env.REACT_APP_JIGJOY_TUTORIAL

	return <iframe src={TUTORIAL_SRC} className="grow w-full" />
}
