import React from "react"
import Tabs from "../../../../components/tabs/tabs"
import Tab from "../../../../components/tabs/tab"
import FileUploader from "../../../../components/file-uploader/file-uploader"
import FileUrlEditor from "../../../../components/file-uploader/file-url-editor"
import { updateBlock } from "../../../../reducers/page-reducer"
import { useDispatch } from "react-redux"

interface FileEditorProps {
	value: string
	attribute: string
	block: any
	fileType: "image" | "video" | "audio"
}

export default function FileEditor({ value, block, attribute, fileType }: FileEditorProps) {
	const dispatch = useDispatch()

	const update = (fileUrl) => {
		const newBlock = { ...block }
		newBlock[attribute] = fileUrl
		dispatch(updateBlock(newBlock))
	}

	return (
		<div className="flex flex-col p-2 w-[300px] mt-4">
			<Tabs>
				<Tab key={`Upload ${fileType}`}>
					<FileUploader mediaType={fileType} callback={update} />
				</Tab>
				<Tab key="Embed link">
					<FileUrlEditor filePath={value} fileType={fileType} callback={update} />
				</Tab>
			</Tabs>
		</div>
	)
}
