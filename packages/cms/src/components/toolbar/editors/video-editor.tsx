import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import Button from "../../button/button"
import Tab from "../../tabs/tab"
import Tabs from "../../tabs/tabs"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../util/store"
import useFileUpload from "../../../hooks/use-file-upload";

let localization = new LocalizedStrings({
    en: {
        update: "Update",
        embedLink: "Embed link",
        uploadVideo: "Upload reel"
    },
    sr: {
        update: "Promeni",
        embedLink: "Unesi link",
        uploadVideo: "Promeni reel"
    }
})

export default function VideoEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch()
    const lang = useLanguage()

    useEffect(() => {
        localization.setLanguage(lang)
    }, [])


    const { fileName, uploading, handleFileUpload, setFileName } = useFileUpload(setValue, 'video');

    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block));
        block[props.attribute] = value;
        dispatch(updateBlock(block));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            <video src={value} className="w-[100px] my-2 rounded-lg" />
            <Tabs>
                <Tab key={localization.uploadVideo}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="video/*"
                        style={{ display: 'none' }}
                    />
                    <Button text="Click to upload video" color="default" action={triggerFileInput} />
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