import React, { useRef, useState } from "react"
import LocalizedStrings from "react-localization"
import { useDispatch } from "react-redux"
import useFileUpload from "../../../../util/file-upload"
import { updateBlock } from "../../../../reducers/page-reducer"
import Checkbox from "../../../../components/checkbox/checkbox"
import Tabs from "../../../../components/tabs/tabs"
import Tab from "../../../../components/tabs/tab"
import Alert from "../../../../components/alert/alert"
import Button from "../../../../components/button/button"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        displayQuestion: "Display question text",
        displayImage: "Display question image",
        embedLink: "Embed link",
        uploadImage: "Upload image",
        clickToUpload: "Click to upload image",
        maxFileUpload: "Maximum image size is 5mb.",
        fileTooLarge: "Image is too large. Please upload a image smaller than 5MB.",
        fileLoadSuccess: "You can start uploading your image.",
        fileUploadedSuccessfully: "Your image upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!"
    },
    RS: {
        update: "Promeni",
        displayQuestion: "Prikaži tekst pitanja",
        displayImage: "Prikaži sliku",
        embedLink: "Unesi link",
        uploadImage: "Promeni sliku",
        clickToUpload: "Klikni da ubaciš sliku",
        maxFileUpload: "Maksimalna velicina slike je 5mb.",
        fileTooLarge: "Slika je prevelika. Molimo vas da otpremite sliku manju od 5MB.",
        fileLoadSuccess: "Možete započeti otpremanje slike.",
        fileUploadedSuccessfully: "Vaša slika je uspešno otpremljena!",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!"
    }
})

export default function QuestionContentEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const [displayUrlInput, setDisplayUrlInput] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [fileUrl, setFileUrl] = useState<string | null>(null)

    const dispatch = useDispatch()
    localization.setLanguage(props.lang)
    const [fileAlert, setFileAlert] = useState({ type: "info", message: localization.maxFileUpload })

    const { handleFileUpload } = useFileUpload(setValue, 'image')

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

            handleChange('image', uploadedFileUrl);
            const block = { ...props.block }
            block[props.attribute] = value
            dispatch(updateBlock(block))

        } catch (error) {
            setFileAlert({ type: "danger", message: localization.uploadError })
        } finally {
            setLoading(false)
        }
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
            <Tabs>
                <Tab key={localization.uploadImage}>
                    <div className="mb-2">
                        <Alert type={fileAlert.type} message={fileAlert.message} />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <Button text={localization.clickToUpload} color="default" action={triggerFileInput} />
                    {file && !loading && <p className="mt-2 text-sm text-ellipsis overflow-hidden">{file.name}</p>}
                </Tab>
                <Tab key={localization.embedLink}>
                    <input className="p-1 rounded-lg border w-[100%] mb-3" value={value.image} onChange={(e: any) => handleChange('image', e.target.value)} />
                </Tab>
            </Tabs>
        </div>
        <Button text={localization.update} action={update} />
    </div>
}