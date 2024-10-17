import React from "react";
import LocalizedStrings from "react-localization";
import { useLanguage } from "../../util/store";
import VideoEditingIcon from "../../icons/video-editing-icon";
import MediaConfigurer from "../media-configurer/media-configurer";

let localization = new LocalizedStrings({
    US: {
        create: "Create",
        update: "Update",
        embedLink: "Embed link",
        uploadFile: "Upload reel",
        clickToUpload: "Click to upload reel",
        maxFileUpload: "Maximum reel size is 5mb.",
        fileTooLarge: "Reel is too large. Please upload a reel smaller than 5MB.",
        fileLoadSuccess: "You can start uploading your reel.",
        fileUploadedSuccessfully: "Your reel upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!",
        clickToAdd: "Click to create."
    },
    RS: {
        create: "Kreiraj",
        update: "Promeni",
        embedLink: "Unesi link",
        uploadFile: "Promeni reel",
        clickToUpload: "Klikni da ubaciš reel",
        maxFileUpload: "Maksimalna velicina reel-a je 5mb.",
        fileTooLarge: "Reel je prevelik. Molimo vas da otpremite reel manji od 5MB.",
        fileLoadSuccess: "Možete započeti otpremanje reel-a.",
        fileUploadedSuccessfully: "Vaš reel je uspešno otpremljen!",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!",
        clickToAdd: "Klikni da kreiraš."
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