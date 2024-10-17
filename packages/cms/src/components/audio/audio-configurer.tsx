import React from "react";
import LocalizedStrings from "react-localization";
import { useLanguage } from "../../util/store";
import AudioEditingIcon from "../../icons/audio-editing-icon";
import MediaConfigurer from "../media-configurer/media-configurer";

let localization = new LocalizedStrings({
    US: {
        create: "Create",
        update: "Update",
        embedLink: "Embed link",
        uploadFile: "Upload audio",
        clickToUpload: "Click to upload audio",
        maxFileUpload: "Maximum audio size is 5mb.",
        fileTooLarge: "Audio is too large. Please upload a audio smaller than 5MB.",
        fileLoadSuccess: "You can start uploading your audio.",
        fileUploadedSuccessfully: "Your audio upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!",
        clickToAdd: "Click to create."
    },
    RS: {
        create: "Kreiraj",
        update: "Promeni",
        embedLink: "Unesi link",
        uploadFile: "Promeni audio",
        clickToUpload: "Klikni da ubaciš audio",
        maxFileUpload: "Maksimalna velicina audi-a je 5mb.",
        fileTooLarge: "Audio je prevelik. Molimo vas da otpremite audio manji od 5MB.",
        fileLoadSuccess: "Možete započeti otpremanje audi-a.",
        fileUploadedSuccessfully: "Vaš audio je uspešno otpremljen!",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!",
        clickToAdd: "Klikni da kreiraš."
    }
})

export default function AudioConfigurer(props: any) {

    const lang = useLanguage()
    localization.setLanguage(lang)

    return (
        <MediaConfigurer
            mediaType="audio"
            icon={<AudioEditingIcon />}
            localization={localization}
            props={props}
            lang={lang}
        />
    );
}