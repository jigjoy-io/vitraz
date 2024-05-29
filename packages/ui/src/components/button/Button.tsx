import React, { useState } from 'react'
import { useEffect } from 'react'
import './../../index.css'

export default function Button(props: any) {

	const [color, setColor] = useState("bg-default text-[white]")

	const setTheme = () => {
		if (props.color == "primary") {
			setColor("bg-primary text-[black]")

		} else if (props.color == "default") {
			setColor("bg-default-light bg-default")
		}
		else {
			setColor("bg-default text-[white]")
		}
	}

	useEffect(() => {
		setTheme()
	}, [props.color])

	return (
		<button className={`${color} px-5 p-3 w-max rounded-lg  ${!props.disabled && "cursor-pointer"} hover:opacity-80 w-[100%] font-bold`} 
			onClick={props.action} disabled={props.disabled}>
			{props.text}
		</button>
	)
}