import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import Button from "../../button/button"
import Tab from "../../tabs/tab"
import Tabs from "../../tabs/tabs"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    en: {
        update: "Update",
        embedLink: "Embed link"
    },
    sr: {
        update: "Promeni",
        embedLink: "Unesi link"
    }
})

localization.setLanguage('sr')

export default function VideoEditor(props: any) {

    const [value, setValue] = useState(props.value)

    const dispatch = useDispatch()


    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    return <div className="flex flex-col p-2 w-[300px] mt-4">
        <video src={value} className="w-[100px] my-2 rounded-lg" />

        <Tabs>
            {/* <Tab key="Upload video">
                <Button text="Click to upload" color="default" />
            </Tab> */}

            <Tab key={localization.embedLink}>
                <input className="p-1 rounded-lg border w-[100%] mb-3" value={value} onChange={(e: any) => setValue(e.target.value)} />
            </Tab>
        </Tabs>


        <Button text={localization.update} action={update} />
    </div>
}