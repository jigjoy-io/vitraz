import React from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../../util/store"
import FileEditor from "../../../designer/toolbar/editors/file-editor"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        embedLink: "Embed link",
        uploadFile: "Upload image",
        clickToUpload: "Click to upload image",
        fileTooLarge: "Image is too large. Please upload a image smaller than 5MB.",
        fileLoadSuccess: "You can start uploading your image.",
        fileUploadedSuccessfully: "Your image upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!",
        embedLinkPlaceholder: "Enter image url",
        embedButton: "Embed",
    },
    RS: {
        update: "Promeni",
        embedLink: "Unesi link",
        uploadFile: "Promeni sliku",
        clickToUpload: "Klikni da ubaciš sliku",
        fileTooLarge: "Slika je prevelika. Molimo vas da otpremite sliku manju od 5MB.",
        fileLoadSuccess: "Možete započeti otpremanje slike.",
        fileUploadedSuccessfully: "Vaša slika je uspešno otpremljena!",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!",
        embedLinkPlaceholder: "Unesi link slike",
        embedButton: "Ubaci",
    }
})

export default function ImageEditor(props: any) {

    const lang = useLanguage()
    localization.setLanguage(props.lang)

    return <FileEditor
        attribute={props.attribute}
        value={props.value}
        block={props.block}
        fileType="image"
        localization={localization}
        lang={lang}
    />
}