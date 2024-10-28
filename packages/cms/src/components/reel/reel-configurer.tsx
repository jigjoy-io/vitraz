import React from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../util/store"
import VideoEditingIcon from "../../icons/video-editing-icon"
import MediaConfigurer from "../media-configurer/media-configurer"

let localization = new LocalizedStrings({
    US: {
        create: "Create",
        update: "Update",
        embedLink: "Embed link",
        embedLinkPlaceholder: "Enter video url",
        embedButton: "Embed",
        uploadFile: "Upload reel",
        clickToUpload: "Click to upload reel",
        fileTooLarge: "Reel is too large. Please upload a reel smaller than 5MB.",
        fileLoadSuccess: "You can start uploading your reel.",
        fileUploadedSuccessfully: "Your reel upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!",
        clickToAdd: "Click to add a video"
    },
    RS: {
        create: "Kreiraj",
        update: "Promeni",
        embedLink: "Unesi link",
        embedLinkPlaceholder: "Unesi link do videa",
        embedButton: "Ubaci",
        uploadFile: "Promeni reel",
        clickToUpload: "Klikni da ubaciš reel",
        fileTooLarge: "Reel je prevelik. Molimo vas da otpremite reel manji od 5MB.",
        fileLoadSuccess: "Možete započeti otpremanje reel-a.",
        fileUploadedSuccessfully: "Vaš reel je uspešno otpremljen!",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!",
        clickToAdd: "Klikni da ubaciš video"
    }
})

export default function ReelConfigurer(props: any) {

    const lang = useLanguage()
    localization.setLanguage(lang)

    return (
        <MediaConfigurer
            mediaType="video"
            icon={<VideoEditingIcon />}
            localization={localization}
            props={props}
            lang={lang}
        />
    );
}