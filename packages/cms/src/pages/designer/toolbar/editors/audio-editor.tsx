import React from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../../util/store"
import FileEditor from "./file-editor"

let localization = new LocalizedStrings({
	US: {
		update: "Update",
		embedLink: "Embed link",
		embedLinkPlaceholder: "Enter audio url",
		embedButton: "Embed",
		uploadFile: "Upload audio",
		clickToUpload: "Click to upload audio",
		fileTooLarge: "Audio is too large. Please upload a audio smaller than 5MB.",
		fileLoadSuccess: "You can start uploading your audio.",
		uploadInProgress: "Upload in progress...",
		uploadError: "Error has occured during the upload!",
		fileUploadedSuccessfully: "Your audio upload has finished!",
	},
	RS: {
		update: "Promeni",
		embedLink: "Unesi link",
		embedLinkPlaceholder: "Unesi link do audio fajla",
		embedButton: "Ubaci",
		uploadFile: "Promeni zvuk",
		clickToUpload: "Klikni da ubaciš zvuk",
		fileTooLarge: "Audio je prevelik. Molimo vas da otpremite audio manji od 5MB.",
		fileLoadSuccess: "Možete započeti otpremanje audio datoteke.",
		uploadInProgress: "Otpremljivanje je u toku...",
		uploadError: "Greška prilikom otpremljivanja!",
		fileUploadedSuccessfully: "Vaš audio je uspešno otpremljen!",
	},
})

export default function AudioEditor(props: any) {
	const lang = useLanguage()
	localization.setLanguage(props.lang)

	return <FileEditor attribute={props.attribute} value={props.value} block={props.block} fileType="audio" localization={localization} lang={lang} />
}
