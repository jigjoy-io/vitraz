import React from "react"

export default function QuestionContent(props: any) {
	return (
		<div className="flex flex-col gap-3">
			{props.content.displayQuestion && <div className="text-heading">{props.content.text}</div>}
			{props.content.displayImage && (
				<div className="flex" style={{ justifyContent: "center" }}>
					<img src={props.content.image} className="rounded-[20px] max-w-[300px] " loading="lazy" />
				</div>
			)}
		</div>
	)
}
