import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import AudioButton from "../../audio/audio-button"
import Button from "../../button/button"
import Tab from "../../tabs/tab"
import Tabs from "../../tabs/tabs"
import useFileUpload from "../../../util/file-upload"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        embedLink: "Embed link",
        uploadAudio: "Upload audio",
        clickToUpload: "Click to upload audio"
    },
    RS: {
        update: "Promeni",
        embedLink: "Unesi link",
        uploadAudio: "Promeni zvuk",
        clickToUpload: "Klikni da ubaciš zvuk" 
    }
})

export default function AudioEditor(props: any) {
    const [value, setValue] = useState(props.value)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const { fileName, uploading, handleFileUpload, setFileName } = useFileUpload(setValue, 'audio')

    localization.setLanguage(props.lang)

    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleFileUpload(file)
        }
    }

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            <AudioButton source={value} />
            <Tabs>
                <Tab key={localization.uploadAudio}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="audio/*"
                        style={{ display: 'none' }}
                    />
                    <Button text={localization.clickToUpload} color="default" action={triggerFileInput} />
                    {fileName && <p className="mt-2 text-sm">{fileName}</p>}
                </Tab>
                <Tab key={localization.embedLink}>
                    <input className="p-1 rounded-lg border w-[100%] mb-3" value={value} onChange={(e: any) => setValue(e.target.value)} />
                </Tab>
            </Tabs>
            <Button text={localization.update} action={update} />
        </div>
    );
}