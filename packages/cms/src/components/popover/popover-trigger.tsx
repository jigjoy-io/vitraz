import React from "react"

export default function PopoverTrigger(props: any) {
	return (
		<div className="cursor-pointer" onClick={props.toggle}>
			{props.children}
		</div>
	)
}
