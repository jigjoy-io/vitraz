import React, { useEffect, useState } from "react"
import CheckedIcon from "../../icons/CheckedIcon"


export default function Checkbox(props: any) {

    const [selected, setSelected] = useState(props.selected)

    useEffect(() => {
        setSelected(props.selected)
    }, [props.selected])

    const handleChange = () => {
        let newValue = !selected
        setSelected(newValue)
        props.onChange(props.id, newValue)
    }

    return <div className="flex cursor-pointer" onClick={handleChange}>
        <div className="w-[20px] h-[20px] border shadow rounded-md mr-3 hover:opacity-60 flex text-center items-center">
            {selected && <CheckedIcon />}
        </div>
        {props.children}
    </div>
}