import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import AudioButton from "../../audio/audio-button"
import Button from "../../button/button"
import Tab from "../../tabs/tab"
import Tabs from "../../tabs/tabs"
import useFileUpload from "../../../util/file-upload"
import LocalizedStrings from "react-localization"
import Alert from "../../alert/alert"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        embedLink: "Embed link",
        uploadAudio: "Upload audio",
        clickToUpload: "Click to upload audio",
        maxFileUpload: "Maximum audio file size is 5mb.",
        fileTooLarge: "Audio is too large. Please upload a audio smaller than 5MB.",
        fileLoadSuccess: "You can start uploading your audio.",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!",
        fileUploadedSuccessfully: "Your audio upload has finished!",
    },
    RS: {
        update: "Promeni",
        embedLink: "Unesi link",
        uploadAudio: "Promeni zvuk",
        clickToUpload: "Klikni da ubaciš zvuk",
        maxFileUpload: "Maksimalna veličina audio fajla je 5mb.",
        fileTooLarge: "Audio je prevelik. Molimo vas da otpremite audio manji od 5MB.",
        fileLoadSuccess: "Možete započeti otpremanje audio datoteke.",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!",
        fileUploadedSuccessfully: "Vaš audio je uspešno otpremljen!",
    }
})

export default function AudioEditor(props: any) {
    const [value, setValue] = useState(props.value)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [fileUrl, setFileUrl] = useState<string | null>(null)

    const dispatch = useDispatch()
    localization.setLanguage(props.lang)
    const [fileAlert, setFileAlert] = useState({ type: "info", message: localization.maxFileUpload })

    const { handleFileUpload } = useFileUpload(setValue, 'audio')

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setFileAlert({ type: "danger", message: localization.fileTooLarge })
            } else {
                setFile(selectedFile)
                setFileAlert({ type: "info", message: localization.fileLoadSuccess })
            }
        }
    }

    const update = async () => {
        setLoading(true)
        try {
            let uploadedFileUrl = fileUrl

            if (file && !fileUrl) {
                setFileAlert({ type: "info", message: localization.uploadInProgress })
                uploadedFileUrl = await handleFileUpload(file)
                setFileUrl(uploadedFileUrl)
                setFileAlert({ type: "success", message: localization.fileUploadedSuccessfully })
            }

            const block = { ...props.block }
            block[props.attribute] = uploadedFileUrl || value
            dispatch(updateBlock(block))

        } catch (error) {
            setFileAlert({ type: "danger", message: localization.uploadError })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            <AudioButton id={props.id} source={value} />
            <Tabs>
                <Tab key={localization.uploadAudio}>
                    <div className="mb-2">
                        <Alert type={fileAlert.type} message={fileAlert.message} />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="audio/*"
                        style={{ display: 'none' }}
                    />
                    <Button text={localization.clickToUpload}  width="w-full" color="default" action={triggerFileInput} />
                    {file && !loading && <p className="mt-2 text-sm text-ellipsis overflow-hidden">{file.name}</p>}
                </Tab>
                <Tab key={localization.embedLink}>
                    <input className="p-1 rounded-lg border w-[100%] mb-3" value={value} onChange={(e: any) => setValue(e.target.value)} />
                </Tab>
            </Tabs>
            <Button text={localization.update} action={update} />
        </div>
    )
}
