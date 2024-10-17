import React, { useState } from "react"
import { useDispatch } from "react-redux"
import LocalizedStrings from "react-localization"
import { updateBlock } from "../../../../reducers/page-reducer"
import Tabs from "../../../../components/tabs/tabs"
import Tab from "../../../../components/tabs/tab"
import Button from "../../../../components/button/button"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        confirmationButtonText: "Confirmation button text: ",
        titile: "Title: ",
        message: "Message: ",
        correct: "Correct answer",
        incorrect: "Incorrect answer"
    },
    RS: {
        update: "Promeni",
        confirmationButtonText: "Dugme za potvrdu:",
        titile: "Naslov: ",
        message: "Poruka: ",
        correct: "Tačan odgovor",
        incorrect: "Netačan odgovor"
    }
})

export default function QuestionOutcomesEditor(props: any) {

    const [value, setValue] = useState(props.value)

    const dispatch = useDispatch()
    localization.setLanguage(props.lang)


    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    const handleOutcomeChange = (selected, key, newValue) => {
        let outcomes = JSON.parse(JSON.stringify(value))
        outcomes[selected][key] = newValue
        setValue(outcomes)
    }

    const handleButtonChange = (key, newValue) => {
        let outcomes = JSON.parse(JSON.stringify(value))
        outcomes[key] = newValue
        setValue(outcomes)
    }

    return <div className="flex flex-col p-2 w-[350px] mt-4">

        <div>{localization.confirmationButtonText}</div>
        <input className="p-1 mt-2 rounded-lg border w-[100%] mb-3" value={value.confirmationButtonText} onChange={(e: any) => handleButtonChange('confirmationButtonText', e.target.value)} />

        <Tabs>
            <Tab key={localization.correct}>
                <div>{localization.titile}</div>
                <input className="p-1 mt-2 rounded-lg border w-[100%] mb-3" value={value.correct.title} onChange={(e: any) => handleOutcomeChange('correct','title', e.target.value)} />
                <div>{localization.message}</div>
                <textarea className="p-1 mt-2 rounded-lg border w-[100%] mb-3" value={value.correct.message} onChange={(e: any) => handleOutcomeChange('correct','message', e.target.value)} />
            </Tab>

            <Tab key={localization.incorrect}>
                <div>{localization.titile}</div>
                <input className="p-1 mt-2 rounded-lg border w-[100%] mb-3" value={value.incorrect.title} onChange={(e: any) => handleOutcomeChange('incorrect','title', e.target.value)} />
                <div>{localization.message}</div>
                <textarea className="p-1 mt-2 rounded-lg border w-[100%] mb-3" value={value.incorrect.message} onChange={(e: any) => handleOutcomeChange('incorrect','message', e.target.value)} />
            </Tab>
        </Tabs>

        <Button text={localization.update} action={update} />
    </div>
}