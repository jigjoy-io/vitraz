import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import Button from "../../button/Button"

export default function TextAreaEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const dispatch = useDispatch()

    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    return <div className="flex flex-col p-2">
        <textarea className="p-2 rounded-lg border w-[100%] mb-2" defaultValue={value} value={value} onChange={(event) => setValue(event.target.value)} />
        <Button text="Update" action={update} />
    </div>
}