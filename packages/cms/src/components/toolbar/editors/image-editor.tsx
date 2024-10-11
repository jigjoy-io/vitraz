import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import Button from "../../button/button"
import Tab from "../../tabs/tab"
import Tabs from "../../tabs/tabs"
import LocalizedStrings from "react-localization"
import useFileUpload from "../../../util/file-upload"
import Alert from "../../alert/alert"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        embedLink: "Embed link",
        uploadImage: "Upload image",
        clickToUpload: "Click to upload image",
        maxFileUpload: "Maximum file size is 5mb",
        fileTooLarge: "File is too large. Please upload a file smaller than 5MB.",
        fileUploadSuccess: "Your image is ready for upload!",
    },
    RS: {
        update: "Promeni",
        embedLink: "Unesi link",
        uploadImage: "Promeni sliku",
        clickToUpload: "Klikni da ubaciš sliku",
        maxFileUpload: "Maksimalna velicina fajla je 5mb",
        fileTooLarge: "Fajl je prevelik. Molimo vas da otpremite fajl manji od 5MB.",
        fileUploadSuccess: "Vaša slika je spreman za otpremljivanje!"
    }
})

export default function ImageEditor(props: any) {
    const [value, setValue] = useState(props.value)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileAlert, setFileAlert] = useState({ type: "info", message: localization.maxFileUpload })

    const dispatch = useDispatch()
    localization.setLanguage(props.lang)

    const { fileName, uploading, handleFileUpload, setFileName } = useFileUpload(setValue, 'image')


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
            if (file.size > 5 * 1024 * 1024) {
                setFileAlert({ type: "danger", message: localization.fileTooLarge })
            } else {
                setFileAlert({ type: "success", message: localization.fileUploadSuccess })
                handleFileUpload(file)
            }
        }
    }

    useEffect(() => {
        if (!uploading && fileName) {
            setFileAlert({ type: "success", message: localization.fileUploadSuccess })
        }
    }, [uploading, fileName])

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            <img src={value} className="w-[100px] my-2 rounded-lg" alt="Uploaded" />
            <Tabs>
                <Tab key={localization.uploadImage}>
                    <div className="mb-2">
                        <Alert type={fileAlert.type} message={fileAlert.message} small={true} />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
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
    )
}