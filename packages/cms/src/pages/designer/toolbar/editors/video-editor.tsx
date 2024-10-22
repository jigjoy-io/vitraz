import React from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../../util/store"
import FileEditor from "./file-editor"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        embedLink: "Embed link",
        embedLinkPlaceholder: "Enter video url",
        embedButton: "Embed",
        uploadFile: "Upload reel",
        clickToUpload: "Click to upload reel",
        fileTooLarge: "Reel is too large. Please upload a reel smaller than 5MB. Or use embedded link option.",
        fileLoadSuccess: "You can start uploading your reel.",
        fileUploadedSuccessfully: "Your reel upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!"
    },
    RS: {
        update: "Promeni",
        embedLink: "Unesi link",
        embedLinkPlaceholder: "Unesi link do videa",
        embedButton: "Ubaci",
        uploadFile: "Promeni reel",
        clickToUpload: "Klikni da ubaciš reel",
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
            attribute={props.attribute}
            value={props.value}
            block={props.block}
            fileType="video"
            localization={localization}
            lang={lang}
        />
    )
}