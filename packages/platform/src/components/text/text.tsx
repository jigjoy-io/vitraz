import React, { useEffect, useState } from "react"
import alignmentVariations from "../../util/style-helper/alignment-variations"

export default function Text(props: any) {
	const [position, setPosition] = useState(props.position)

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	return (
		<div className={`inline-block h-min-[1.7rem] h-max w-[100%] ${alignmentVariations[position]}`}>
			<div className="text-paragraph whitespace-pre-line">{props.text}</div>
		</div>
	)
}
