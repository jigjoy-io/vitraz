import React, { useState } from "react"
import UrlValidator from "../../util/file-upload/url-validator"
import Alert from "../alert/alert"
import Input from "../input/input"
import Button from "../button/button"
import AlertProps, { AlertType } from "../alert/alert-props"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../util/store"

let translations = new LocalizedStrings({
	US: {
		emptyFieldError: "Link field is empty.",
	},
	RS: {
		emptyFieldError: "Polje za link je prazno.",
	},
})

export default function FileUrlEditor({ filePath, fileType, localization, callback }) {
	const [fileUrl, setFileUrl] = useState<string>(filePath)
	const [urlAlert, setUrlAlert] = useState<AlertProps | null>(null)

	const lang = useLanguage()
	translations.setLanguage(lang)

	const handleUrlUpdate = (url) => {
		if (UrlValidator.validate(fileType, url)) {
			callback(url)
		} else {
			setUrlAlert({ type: AlertType.DANGER, message: translations.emptyFieldError })
		}
	}

	return (
		<>
			{urlAlert && (
				<div className="mb-2">
					<Alert type={urlAlert.type} message={urlAlert.message} />
				</div>
			)}

			<Input value={fileUrl} onChange={setFileUrl} placeholder={localization.embedLinkPlaceholder} />

			<div className="mt-3">
				<Button width="w-full" text={localization.embedButton} action={() => handleUrlUpdate(fileUrl)} />
			</div>
		</>
	)
}
