import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Button(props: any) {

	const [color, setColor] = useState("bg-default text-[white]")
	const [width, setWidth] = useState("w-max")
	const [size, setSize] = useState("lg")

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

	useEffect(() => {
		setSize(props.size)
	}, [props.size])

	return (
		<button tabIndex={-1} className={`${color} ${props.size == 'sm' ? 'p-1 px-3 rounded-md' : 'p-3 font-bold rounded-lg w-[100%]'} ${!props.disabled && "cursor-pointer"} active:opacity-80 md:hover:opacity-80`}
			onClick={props.action} disabled={props.disabled} autoFocus={props.focus}>
			{props.text}
		</button>
	)
}