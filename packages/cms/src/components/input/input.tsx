import React, { useState } from "react"

export default function Input(props: any) {
	const [value, setValue] = useState(props.value)

	const handleChange = (event: any) => {
		setValue(event.target.value)
		props.onChange && props.onChange(event.target.value)
	}

	return (
		<>
			{props.label && (
				<div className="py-1">
					<label>{props.label}</label>
				</div>
			)}
			<input onChange={handleChange} className="w-[100%] p-2 bg-[white] border border-light shadow-lg px-[8px] rounded-[5px] outline-none" value={props.inputType == "date" && !value ? new Date() : value} name={props.key} placeholder={props.placeholder} type={props.inputType} />
		</>
	)
}
