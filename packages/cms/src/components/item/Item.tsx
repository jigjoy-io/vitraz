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
					className={`min-w-[200px]
						${selected == props.id ? "bg-primary-light" : "bg-[white]"} 
						${props.borderOn && "!border-light shadow-md"} 
						hover:border-primary
						hover:bg-primary-light border border-[white] 
						p-2 rounded-lg cursor-pointer`}>
					{props.icon && <props.icon />}
					{props.color && <div className={`border w-[25px] h-[25px] mr-4 ${props.color}`} />}
					{props.text}
				</div>
			</Tooltip>

			:

			<>


				<div onClick={() => props.action(props)}
					className={`min-w-[200px] ${(selected != null && selected === props.id) ? "bg-primary-light" : "bg-[white]"} 
								border-2 border-[white] hover:bg-primary-light  
								${props.borderOn && "border border-light shadow-md"} 
								p-2 hover:border-primary rounded-lg cursor-pointer flex flex-row`}>
					{props.icon && <div className="pr-2"><props.icon /></div>}
					{props.color && <div className={`border w-[25px] h-[25px] mr-4 rounded-lg ${props.color}`} />}
					{props.text}
				</div>
			</>



	)

}
