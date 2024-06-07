import React, { useEffect, useState } from "react"
import Tooltip from "../tooltip/Tooltip"

export default function Item(props: any) {

	const [selected, setSelected] = useState(props.selected)

	useEffect(() => {
		setSelected(props.selected)
	}, [props.selected])

	return (

		props.tooltip ?
			<Tooltip message={props.tooltip}>
				<div onClick={() => props.action(props)}
					className={`min-w-[150px]
						${selected == props.id ? "bg-primary-light" : "bg-[white]"} 
						${props.borderOn && "!border-light shadow-md"} hover:border-primary
						hover:bg-primary-light border border-[white] 
						p-2 rounded-lg cursor-pointer`}>
					{props.text}
				</div>
			</Tooltip>

			:

			<div onClick={() => props.action(props)} className={`min-w-[150px] 
			${(selected != null && selected === props.id) ? "bg-primary-light" : "bg-[white]"} 
			border-2 border-[white] hover:bg-primary-light  
			${props.borderOn && "border border-light shadow-md"}  p-2 hover:border-primary rounded-lg cursor-pointer`}>
				{props.text}
			</div>


	)

}
