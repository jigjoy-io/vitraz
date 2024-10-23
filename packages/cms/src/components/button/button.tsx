import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Button(props: any) {

	const [color, setColor] = useState("bg-default text-[white]")
	const [width, setWidth] = useState(props.width)
	const [size, setSize] = useState("lg")
	let touchTimeout: NodeJS.Timeout | null = null

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
		<button tabIndex={-1} 
		
			className={`${color} ${width} ${props.size == 'sm' ? 'p-1 px-3 rounded-md font-bold' : 'p-3 font-bold rounded-lg text-ellipsis text-nowrap overflow-hidden'} ${!props.disabled && "cursor-pointer"} active:opacity-80 md:hover:opacity-80 touch-manipulation`}

			onClick={(e) => {
				if (!touchTimeout) {

				  touchTimeout = setTimeout(() => {
					touchTimeout = null
					props.action()
				  }, 300) // Add a delay of 300ms to debounce the click event (TODO: Refactor ios hack for JIG-383)
				}
			  }}

			disabled={props.disabled}
			autoFocus={props.focus}>
			{props.text}
		</button>
	)
}