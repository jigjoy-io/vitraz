import { useEffect, useState } from "react"

export default function Item(props: {
	selected?: string
	tabFocus?: boolean
	borderOn?: boolean
	icon?: any
	onClick: any
	children?: any
	color?: string
	text: string
	id?: string
}) {
	const [selected, setSelected] = useState(props.selected)

	useEffect(() => {
		setSelected(props.selected)
	}, [props.selected])

	const callback = (event: any) => {
		props.onClick(event, props)
	}

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			callback(event)
		}
	}

	return (
		<div
			onClick={callback}
			onKeyDown={handleKeyDown}
			tabIndex={props.tabFocus ? 0 : -1}
			className={`min-w-[225px] 
			${selected != null && selected === props.id ? "bg-gradient-custom-opacity" : "bg-[white]"} 
			border-2 border-[white] md:hover:bg-primary-light  
			${props.borderOn && "border border-light shadow-md"} 
			rounded-[5px] cursor-pointer flex flex-col`}
		>
			<div className="flex flex-row p-1">
				{props.icon && (
					<div className="pl-1 pr-2 flex items-center">
						<props.icon />
					</div>
				)}
				<div className={props.color && `${props.color}`}>{props.text}</div>
			</div>
			<div>{props.children}</div>
		</div>
	)
}
