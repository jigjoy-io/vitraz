import React, { useState } from "react"
import UrlValidator from "../../util/file-upload/url-validator"
import Alert from "../alert/alert"
import Input from "../input/input"
import Button from "../button/button"
import AlertProps, { AlertType } from "../alert/alert-props"

export default function FileUrlEditor({ filePath, fileType, callback }) {
	const [fileUrl, setFileUrl] = useState<string>(filePath)
	const [urlAlert, setUrlAlert] = useState<AlertProps | null>(null)

	const handleUrlUpdate = (url) => {
		if (UrlValidator.validate(fileType, url)) {
			callback(url)
		} else {
			setUrlAlert({ type: AlertType.DANGER, message: "Link field is empty." })
		}
	}

	return (
		<>
			{urlAlert && (
				<div className="mb-2">
					<Alert type={urlAlert.type} message={urlAlert.message} />
				</div>
			)}

			<Input value={fileUrl} onChange={setFileUrl} placeholder={`Enter ${fileType} url`} />

			<div className="mt-3">
				<Button width="w-full" text="Embed" action={() => handleUrlUpdate(fileUrl)} />
			</div>
		</>
	)
}
