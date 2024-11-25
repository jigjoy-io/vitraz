import React, { useState } from "react"
import Button from "../button/button"
import Input from "../input/input"

export default function Form(props: any) {
	const [value, setValue] = useState(props.value)

	const submitAnswer = () => {}

	return (
		<>
			{props.inputs.map((input: any) => (
				<>
					{input.label && (
						<div className="py-1">
							<label>{input.label}</label>
						</div>
					)}
					<Input value={value} placeholder={input.placeholder} />
				</>
			))}

			<div className="py-4">
				<Button text="Submit" width="w-full" action={submitAnswer} disabled={value !== ""} rounded />
			</div>
		</>
	)
}
