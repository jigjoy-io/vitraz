import React from "react"

export default function QuestionContent(props: any) {
	return (
		<div className="flex flex-col gap-3">
			{props.content.displayQuestion && <div className="text-heading">{props.content.text}</div>}
			{props.content.displayImage && <img src={props.content.image} className="rounded-[20px]" loading="lazy" />}
		</div>
	)
}
