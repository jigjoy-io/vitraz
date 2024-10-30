import React, { useState } from "react"

export default function TextArea(props: any) {
	const [value, setValue] = useState(props.value)

	const handleChange = (event: any) => {
		setValue(event.target.value)
		props.onChange && props.onChange(event.target.value)
	}

	return <textarea onChange={handleChange} rows={3} className="w-[100%] bg-[white] border border-light shadow-lg p-[3px] px-[8px] rounded-[5px] outline-none" value={value} name={props.key} placeholder={props.placeholder} />
}
