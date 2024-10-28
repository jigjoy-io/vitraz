import React, { useEffect, useState } from "react"
import LocalizedStrings from "react-localization"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../../reducers/page-reducer"
import Checkbox from "../../../../components/checkbox/checkbox"
import Tabs from "../../../../components/tabs/tabs"
import Tab from "../../../../components/tabs/tab"
import FileUploader from "../../../../components/file-uploader/file-uploader"
import FileUrlEditor from "../../../../components/file-uploader/file-url-editor"

let localization = new LocalizedStrings({
	US: {
		update: "Update",
		displayQuestion: "Display question text",
		displayImage: "Display question image",
		embedLink: "Embed link",
		embedButton: "Embed",
		uploadImage: "Upload image",
		clickToUpload: "Click to upload image",
		fileTooLarge: "Image is too large. Please upload a image smaller than 5MB.",
		fileLoadSuccess: "You can start uploading your image.",
		fileUploadedSuccessfully: "Your image upload has finished!",
		uploadInProgress: "Upload in progress...",
		uploadError: "Error has occured during the upload!",
	},
	RS: {
		update: "Promeni",
		displayQuestion: "Prikaži tekst pitanja",
		displayImage: "Prikaži sliku",
		embedLink: "Unesi link",
		embedButton: "Ubaci",
		uploadImage: "Promeni sliku",
		clickToUpload: "Klikni da ubaciš sliku",
		fileTooLarge: "Slika je prevelika. Molimo vas da otpremite sliku manju od 5MB.",
		fileLoadSuccess: "Možete započeti otpremanje slike.",
		fileUploadedSuccessfully: "Vaša slika je uspešno otpremljena!",
		uploadInProgress: "Otpremljivanje je u toku...",
		uploadError: "Greška prilikom otpremljivanja!",
	},
})

export default function QuestionContentEditor(props: any) {
	const [value, setValue] = useState(props.value)

	const dispatch = useDispatch()
	localization.setLanguage(props.lang)

	const handleChange = (key, newValue) => {
		let content = JSON.parse(JSON.stringify(value))
		content[key] = newValue
		setValue(content)
	}

	useEffect(() => {
		const block = { ...props.block }
		block[props.attribute] = value
		dispatch(updateBlock(block))
	}, [value])

	const handleImageChange = (url) => {
		handleChange("image", url)
	}

	return (
		<div className="flex flex-col p-2 w-[300px] mt-4">
			<div className="pb-4">
				<Checkbox id="displayQuestion" selected={value.displayQuestion} onChange={handleChange}>
					{localization.displayQuestion}
				</Checkbox>
			</div>

			<input className="p-1 rounded-lg border w-[100%] mb-8" value={value.text} onChange={(e: any) => handleChange("text", e.target.value)} />

			<Checkbox id="displayImage" selected={value.displayImage} onChange={handleChange}>
				{localization.displayImage}
			</Checkbox>
			<img src={value.image} className="w-[100px] my-2 rounded-lg" />
			<div className="flex gap-3 mt-3">
				<Tabs>
					<Tab key={localization.uploadImage}>
						<FileUploader mediaType="image" localization={localization} callback={handleImageChange} />
					</Tab>
					<Tab key={localization.embedLink}>
						<FileUrlEditor filePath={value.image} fileType="image" localization={localization} callback={handleImageChange} />
					</Tab>
				</Tabs>
			</div>
		</div>
	)
}
