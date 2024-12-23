import React, { lazy, Suspense, useState } from "react"
import Alert from "../alert/alert"
import AlertProps, { AlertType } from "../alert/alert-props"
import Input from "../../../../../jigjoyui/src/components/input"
const Button = lazy(() => import("renderer/Button"))

export default function FileUrlEditor({ filePath, fileType, callback }) {
	const [fileUrl, setFileUrl] = useState<string>(filePath)
	const [urlAlert, setUrlAlert] = useState<AlertProps | null>(null)

	const handleUrlUpdate = (url) => {
		if (url) {
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
				<Suspense>
					<Button width="w-full" text="Embed" action={() => handleUrlUpdate(fileUrl)} />
				</Suspense>
			</div>
		</>
	)
}
