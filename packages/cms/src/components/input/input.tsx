import React, { useState } from "react"

export default function Input(props: any) {

    const [value, setValue] = useState('')



    const handleChange = (event: any) => {
        setValue(event.target.value)
        props.action(event.target.value)
    }

    return <input
        onChange={handleChange}
        className="h-[40px] bg-[white] border border-light shadow-lg p-[3px] px-[8px] rounded-lg outline-none"
        value={value}
        name={props.key}
        placeholder={props.placeholder}
        type={props.type} />

}
