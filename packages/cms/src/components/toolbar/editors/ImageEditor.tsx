import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import Button from "../../button/Button"
import Tab from "../../tabs/Tab"
import Tabs from "../../tabs/Tabs"

export default function ImageEditor(props: any) {

    const [value, setValue] = useState(props.value)

    const dispatch = useDispatch()


    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    return <div className="flex flex-col p-2 w-[300px] mt-4">
        <img src={value} className="w-[100px] my-2 rounded-lg" />
        <Tabs>
            <Tab key="Upload image">
                <Button text="Click to upload" color="default" />
            </Tab>

            <Tab key="Embed link">
                <input className="p-1 rounded-lg border w-[100%] mb-3" value={value} onChange={(e: any) => setValue(e.target.value)} />
            </Tab>
        </Tabs>

        <Button text="Update" action={update} />
    </div>
}