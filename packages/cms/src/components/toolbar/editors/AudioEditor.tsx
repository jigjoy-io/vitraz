import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import AudioButton from "../../audio/AudioButton"
import Button from "../../button/Button"
import Tab from "../../tabs/Tab"
import Tabs from "../../tabs/Tabs"

export default function AudioEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState("")

    const dispatch = useDispatch()


    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (!file.type.startsWith('audio/')) {
                alert('Please select an audio file.')
                return
            }

            setFileName(file.name)

            // Here you would typically upload to S3 and get a URL back
            // For now, we'll just create a local object URL
            const objectUrl = URL.createObjectURL(file)
            setValue(objectUrl)

            // In real S3 implementation, you'd set the value to the S3 URL instead
            // setValue(s3Url)
        }
    }


    return <div className="flex flex-col p-2 w-[300px] mt-4">
        <AudioButton source={value} />

        <Tabs>
            <Tab key="Upload reel">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="audio/*"
                    style={{ display: 'none' }}
                />
                <Button text="Click to upload audio" color="default" action={triggerFileInput} />
                {fileName && <p className="mt-2 text-sm">{fileName}</p>}
            </Tab>

            <Tab key="Embed link">
                <input className="p-1 rounded-lg border w-[100%] mb-3" value={value} onChange={(e: any) => setValue(e.target.value)} />
            </Tab>
        </Tabs>

        <Button text="Update" action={update} />
    </div>
}