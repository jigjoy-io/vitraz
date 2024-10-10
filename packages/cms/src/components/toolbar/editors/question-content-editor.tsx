import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import Button from "../../button/button"
import Checkbox from "../../checkbox/checkbox"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        displayQuestion: "Display question text",
        displayImage: "Display question image",
        embedLink: "Embed link"
    },
    RS: {
        update: "Promeni",
        displayQuestion: "Prikaži tekst pitanja",
        displayImage: "Prikaži sliku",
        embedLink: "Unesi link"
    }
})

export default function QuestionContentEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const [displayUrlInput, setDisplayUrlInput] = useState(false)

    const dispatch = useDispatch()
    localization.setLanguage(props.lang)


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
            <Checkbox id="displayQuestion" selected={value.displayQuestion} onChange={handleChange}>{localization.displayQuestion}</Checkbox>
        </div>

        <input className="p-1 rounded-lg border w-[100%] mb-8" value={value.text} onChange={(e: any) => handleChange('text', e.target.value)} />

        <Checkbox id="displayImage" selected={value.displayImage} onChange={handleChange}>{localization.displayImage}</Checkbox>
        <img src={value.image} className="w-[100px] my-2 rounded-lg" />
        <div className="flex gap-3 my-3">
            {/* <Button text="Upload image" color="default" /> */}
            <Button text={localization.embedLink} color="default" action={() => setDisplayUrlInput(true)} />
        </div>
        {displayUrlInput && <input className="p-1 rounded-lg border w-[100%] mb-3" value={value.image} onChange={(e: any) => handleChange('image', e.target.value)} />}
        <Button text={localization.update} action={update} />
    </div>
}