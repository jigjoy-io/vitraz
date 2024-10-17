import React from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../../util/store"
import FileEditor from "../../../../components/file-editor/file-editor"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        embedLink: "Embed link",
        uploadFile: "Upload reel",
        clickToUpload: "Click to upload reel",
        maxFileUpload: "Maximum video file size is 5mb.",
        fileTooLarge: "Reel is too large. Please upload a reel smaller than 5MB. Or use embedded link option.",
        fileLoadSuccess: "You can start uploading your reel.",
        fileUploadedSuccessfully: "Your reel upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!"
    },
    RS: {
        update: "Promeni",
        embedLink: "Unesi link",
        uploadFile: "Promeni reel",
        clickToUpload: "Klikni da ubaciš reel",
        maxFileUpload: "Maksimalna veličina video fajla je 5mb.",
        fileTooLarge: "Reel je prevelik. Molimo vas da otpremite reel manji od 5MB. Ili koristite opciju unesi link.",
        fileLoadSuccess: "Možete započeti otpremanje reel-a.",
        fileUploadedSuccessfully: "Vaš reel je uspešno otpremljen!",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!",
    }
})

export default function VideoEditor(props: any) {
    const lang = useLanguage()
    localization.setLanguage(props.lang)

    return (
        <FileEditor
            value={props.value}
            block={props.block}
            fileType="video"
            localization={localization}
            lang={lang}
        />
    )
}