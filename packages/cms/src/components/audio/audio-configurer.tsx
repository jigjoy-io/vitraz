import React from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../util/store"
import AudioEditingIcon from "../../icons/audio-editing-icon"
import MediaConfigurer from "../media-configurer/media-configurer"

let localization = new LocalizedStrings({
	US: {
		create: "Create",
		update: "Update",
		embedLink: "Embed link",
		embedLinkPlaceholder: "Enter audio url",
		embedButton: "Embed",
		uploadFile: "Upload audio",
		clickToUpload: "Click to upload audio",
		fileTooLarge: "Audio is too large. Please upload a audio smaller than 5MB.",
		fileUploadedSuccessfully: "Your audio upload has finished!",
		uploadInProgress: "Upload in progress...",
		uploadError: "Error has occured during the upload!",
		clickToAdd: "Click to add an audio",
	},
	RS: {
		create: "Kreiraj",
		update: "Promeni",
		embedLink: "Unesi link",
		embedLinkPlaceholder: "Unesi link do audio fajla",
		embedButton: "Ubaci",
		uploadFile: "Promeni audio",
		clickToUpload: "Klikni da ubaciš audio",
		fileTooLarge: "Audio je prevelik. Molimo vas da otpremite audio manji od 5MB.",
		fileUploadedSuccessfully: "Vaš audio je uspešno otpremljen!",
		uploadInProgress: "Otpremljivanje je u toku...",
		uploadError: "Greška prilikom otpremljivanja!",
		clickToAdd: "Klikni da ubaciš audio",
	},
})

export default function AudioConfigurer(props: any) {
	const lang = useLanguage()
	localization.setLanguage(lang)

	return <MediaConfigurer mediaType="audio" icon={<AudioEditingIcon />} localization={localization} props={props} lang={lang} />
}
