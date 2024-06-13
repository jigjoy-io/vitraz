import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import Button from "../../button/Button"
import Checkbox from "../../checkbox/Checkbox"

export default function QuestionContentEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const [displayUrlInput, setDisplayUrlInput] = useState(false)

    const dispatch = useDispatch()


    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    const handleChange = (key, newValue) => {
        let content = JSON.parse(JSON.stringify(value))
        content[key] = newValue
        setValue(content)
    }

    return <div className="flex flex-col p-2 w-[300px] mt-4">
        <div className="pb-4">
            <Checkbox id="displayQuestion" selected={value.displayQuestion} onChange={handleChange}>Display question text</Checkbox>
        </div>

        <input className="p-1 rounded-lg border w-[100%] mb-8" value={value.text} onChange={(e: any) => handleChange('text', e.target.value)} />

        <Checkbox id="displayImage" selected={value.displayImage} onChange={handleChange}>Display question image</Checkbox>
        <img src={value.image} className="w-[100px] my-2 rounded-lg" />
        <div className="flex gap-3 my-3">
            <Button text="Upload image" color="default" />
            <Button text="Embed link" color="default" action={() => setDisplayUrlInput(true)} />
        </div>
        {displayUrlInput && <input className="p-1 rounded-lg border w-[100%] mb-3" value={value.image} onChange={(e: any) => handleChange('image', e.target.value)} />}
        <Button text="Update" action={update} />
    </div>
}