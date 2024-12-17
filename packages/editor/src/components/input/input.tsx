import React, { useState } from "react"

export default function Input(props: any) {
	const [value, setValue] = useState(props.value)

	const handleChange = (event: any) => {
		let newValue = event.target.value

		if (props.inputType === "date") {
			newValue = formatDate(newValue)
		}

		setValue(newValue)
		props.onChange && props.onChange(newValue)
	}

	const handleKeyDown = (event: any) => {
		if (props.inputType === "number") {
			if (
				/[0-9.+-]/.test(event.key) ||
				event.key === "Backspace" ||
				event.key === "Delete" ||
				event.inputType === "deleteContentBackward" ||
				event.inputType === "deleteContentForward"
			) {
				return
			}
			event.preventDefault()
		}
	}

	const formatDate = (dateString: string) => {
		if (!dateString) return ""

		const date = new Date(dateString)
		const day = String(date.getDate()).padStart(2, "0")
		const month = String(date.getMonth() + 1).padStart(2, "0")
		const year = date.getFullYear()

		return `${year}-${month}-${day}`
	}

	return (
		<>
			{props.label && (
				<div className="py-1">
					<label>{props.label}</label>
				</div>
			)}
			<input
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				className="w-[100%] min-h-[40px] h-[40px] p-2 bg-[white] border border-light shadow-lg px-[8px] rounded-[5px] outline-none text-[16px]"
				value={props.inputType === "date" ? formatDate(value) : value}
				name={props.key}
				placeholder={props.placeholder}
				type={props.inputType}
				pattern={props.inputType === "number" ? "[0-9]*" : undefined}
				inputMode={props.inputType === "number" ? "numeric" : undefined}
			/>
		</>
	)
}
