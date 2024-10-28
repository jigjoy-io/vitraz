import React from "react"
import { useLanguage } from "../../util/store"
import LocalizedStrings from "react-localization"
import ImageEditingIcon from "../../icons/image-editing-icon"
import MediaConfigurer from "../media-configurer/media-configurer"

let localization = new LocalizedStrings({
    US: {
        create: "Create",
        update: "Update",
        embedLink: "Embed link",
        embedLinkPlaceholder: "Enter image url",
        embedButton: "Embed",
        uploadFile: "Upload image",
        clickToUpload: "Click to upload image",
        fileTooLarge: "Image is too large. Please upload a image smaller than 5MB.",
        fileLoadSuccess: "You can start uploading your image.",
        fileUploadedSuccessfully: "Your image upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!",
        clickToAdd: "Click to add an image"
    },
    RS: {
        create: "Kreiraj",
        update: "Promeni",
        embedLink: "Unesi link",
        embedLinkPlaceholder: "Unesi link slike",
        embedButton: "Ubaci",
        uploadFile: "Promeni sliku",
        clickToUpload: "Klikni da ubaciš sliku",
        fileTooLarge: "Slika je prevelika. Molimo vas da otpremite sliku manju od 5MB.",
        fileLoadSuccess: "Možete započeti otpremanje slike.",
        fileUploadedSuccessfully: "Vaša slika je uspešno otpremljena!",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!",
        clickToAdd: "Klikni da ubaciš sliku"
    }
})

export default function ImageConfigurer(props: any) {

    const lang = useLanguage()
    localization.setLanguage(lang)

    return (
        <MediaConfigurer
            mediaType="image"
            icon={<ImageEditingIcon />}
            localization={localization}
            props={props}
            lang={lang}
        />
    );
}
