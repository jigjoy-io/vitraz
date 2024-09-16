import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Button(props: any) {

	const [color, setColor] = useState("bg-default text-[white]")
	const [width, setWidth] = useState("w-max")

	const setTheme = () => {
		if (props.color == "primary") {
			setColor("bg-primary text-[black]")

		} else if (props.color == "default") {
			setColor("bg-default-light")
		}
		else {
			setColor("bg-default text-[white]")
		}

	}

	useEffect(() => {
		setTheme()
	}, [props.color])

	return (
		<button tabIndex={-1} className={`${color} p-3 w-[100%] rounded-lg ${!props.disabled && "cursor-pointer"} hover:opacity-80 font-bold`}
			onClick={props.action} disabled={props.disabled} autoFocus={props.focus}>
			{props.text}
		</button>
	)
}