import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import Button from "../../button/Button"

export default function OptionEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const dispatch = useDispatch()

    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    return <div className="fixed left-[50%] -translate-x-[50%] top-[50%] -translate-y-[100%] z-20 bg-[white] rounded-[20px] shadow px-4 py-8 border border-light">
        <textarea className="p-3 rounded-lg border w-[100%]" value={value} onChange={(event) => setValue(event.target.value)} />
        <Button text="Update" action={update} />
    </div>
}