import React, { useEffect, useState } from "react"

export default function Title(props: any) {
	const [position, setPosition] = useState(props.position)
	const [text, setText] = useState(props.text)

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	useEffect(() => {
		setText(props.text)
	}, [props.text])

	return (
		<div className={`inline-block w-[100%] h-min-[2.5rem] h-max ${position}`}>
			<div className="text-title">{text}</div>
		</div>
	)
}
