import React, { useEffect, useState } from "react"
import CheckedIcon from "../../icons/checked-icon"

export default function Checkbox(props: any) {
	const [selected, setSelected] = useState(props.selected)
	const [disabled, setDisabled] = useState(props.disabled)

	useEffect(() => {
		setSelected(props.selected)
	}, [props.selected])

	const handleChange = () => {
		let newValue = !selected
		setSelected(newValue)
		props.onChange(props.id, newValue)
	}

	return (
		<div className={`${disabled && "opacity-30"} flex cursor-pointer`} onClick={handleChange} style={{ pointerEvents: disabled ? "none" : "auto" }}>
			<div className={`w-[20px] h-[20px] border shadow rounded-[5px] mr-3 hover:opacity-60 flex text-center items-center`}>{selected && <CheckedIcon />}</div>
			{props.children}
		</div>
	)
}
