import React from "react"

export default function QuestionContent(props: any) {
	return <div className="flex flex-col gap-3">
		<div className="text-heading">{props.content.text}</div>
		<img src={props.content.image} loading="lazy"/>
	</div>
}