import React, { useState } from "react"
import { useEffect } from "react"

export default function Button(props: any) {
	const [color, setColor] = useState("bg-default text-[white]")
	const [width, setWidth] = useState(props.width)
	const [size, setSize] = useState("lg")

	const setTheme = () => {
		if (props.color == "primary") {
			setColor("bg-primary text-[black]")
		} else if (props.color == "default") {
			setColor("bg-default-light")
		} else {
			setColor("bg-default text-[white]")
		}
	}

	useEffect(() => {
		setTheme()
	}, [props.color])

	useEffect(() => {
		setSize(props.size)
	}, [props.size])

	return (
		<button
			tabIndex={-1}
			className={`${color} ${width} ${props.size == "sm" ? "p-1 px-3 rounded-md font-bold" : "p-3 font-bold rounded-lg text-ellipsis text-nowrap overflow-hidden"} ${!props.disabled && "cursor-pointer"} active:opacity-80 md:hover:opacity-80 touch-manipulation`}
			onClick={(e) => {
				props.action()
			}}
			disabled={props.disabled}
			autoFocus={props.focus}
		>
			{props.text}
		</button>
	)
}
