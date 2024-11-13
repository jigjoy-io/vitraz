import React, { useEffect, useState } from "react"

export default function Input(props: any) {
	const [value, setValue] = useState(props.value)

	const handleChange = (event: any) => {
		if (props.inputType === "date") {
			setValue(formatDate(event.target.value))
		} else {
			setValue(event.target.value)
		}
		props.onChange && props.onChange(event.target.value)
	}

	const formatDate = (dateString: string) => {
		if (!dateString) return ""

		const date = new Date(dateString)
		const day = String(date.getDate()).padStart(2, "0")
		const month = String(date.getMonth() + 1).padStart(2, "0")
		const year = date.getFullYear()

		return `${year}-${month}-${day}`
	}

	useEffect(() => {
		console.log(props)
	}, [])

	return (
		<>
			{props.label && (
				<div className="py-1">
					<label>{props.label}</label>
				</div>
			)}
			<input
				onChange={handleChange}
				className="w-[100%] min-h-[40px] h-[40px] p-2 bg-[white] border border-light shadow-lg px-[8px] rounded-[5px] outline-none"
				value={props.inputType === "date" ? formatDate(value) : value}
				name={props.key}
				placeholder={props.placeholder}
				type={props.inputType}
			/>
		</>
	)
}
