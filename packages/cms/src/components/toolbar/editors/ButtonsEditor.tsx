import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import Button from "../../button/Button"

interface ButtonTexts {
    previous: string;
    next: string;
    home: string;
}

interface MenuEditorProps {
    block: any;
    attribute: string;
    value?: ButtonTexts;
}

export default function ButtonEditor({ block, attribute }: MenuEditorProps) {
    const [buttonTexts, setButtonTexts] = useState<ButtonTexts>(block.page.config.buttons || {
        previous: 'Previous',
        next: 'Next',
        home: 'Back to Home'
    })
    const dispatch = useDispatch()

    const handleInputChange = (key: keyof ButtonTexts, value: string) => {
        setButtonTexts(prev => ({ ...prev, [key]: value }))
    }

    const update = () => {
        let updatedBlock = JSON.parse(JSON.stringify(block))
        updatedBlock.page.config[attribute] = buttonTexts
        dispatch(updateBlock(updatedBlock))
    }

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            {(Object.entries(buttonTexts) as [keyof ButtonTexts, string][]).map(([key, text]) => (
                <div key={key} className="mb-3">
                    <label htmlFor={key} className="block mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <input
                        id={key}
                        className="p-1 rounded-lg border w-[100%]"
                        value={text}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                </div>
            ))}
            <Button text="Update" action={update} />
        </div>
    )
}