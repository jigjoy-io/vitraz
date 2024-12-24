import React, { lazy, Suspense, useState } from "react"
import Alert, { AlertType } from "@jigjoy-ui/alert"
import Input from "@jigjoy-ui/input"
const Button = lazy(() => import("@jigjoy-ui/button"))

export default function FileUrlEditor({ filePath, fileType, callback }) {
	const [fileUrl, setFileUrl] = useState<string>(filePath)
	const [urlAlert, setUrlAlert] = useState<any>(null)

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
