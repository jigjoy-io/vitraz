import React, { useEffect, useState } from "react"
import Tooltip from "../tooltip/Tooltip"

export default function Item(props: any) {

	const [selected, setSelected] = useState(props.selected)
	const [color, setColor] = useState('')

	useEffect(() => {
		setSelected(props.selected)
	}, [props.selected])

	useEffect(() => {
		setColor(`text-[${props.color}]`)
	}, [props.color])

	return (

		props.tooltip ?
			<Tooltip message={props.tooltip}>
				{props.icon && <props.icon />}
				<div onClick={() => props.action(props)}
					className={`min-w-[200px]
						${selected == props.id ? "bg-primary-light" : "bg-[white]"} 
						${props.borderOn && "!border-light shadow-md"} 
						${color} 
						hover:border-primary
						hover:bg-primary-light border border-[white] 
						p-2 rounded-lg cursor-pointer`}>
					{props.text}
				</div>
			</Tooltip>

			:

			<div onClick={() => props.action(props)} className={`${color} min-w-[200px] 
			${(selected != null && selected === props.id) ? "bg-primary-light" : "bg-[white]"} 
			border-2 border-[white] hover:bg-primary-light  
			${props.borderOn && "border border-light shadow-md"} 
			p-2 hover:border-primary rounded-lg cursor-pointer flex flex-row`}>
				{props.icon && <div className="pr-2"><props.icon color={color} /></div>}
				{props.text}
			</div>


	)

}
