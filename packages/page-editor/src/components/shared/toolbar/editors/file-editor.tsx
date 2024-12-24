import React from "react"
import Tabs from "@jigjoy-ui/tabs"
import Tab from "@jigjoy-ui/tab"
import { updateBlock } from "../../../../reducers/page-reducer"
import { useDispatch } from "react-redux"
import FileSelector from "../../../selectors/media-selector/file-selector"
import FileUrlEditor from "../../../selectors/media-selector/file-url-editor"

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
					<FileSelector mediaType={fileType} callback={update} />
				</Tab>
				<Tab key="Embed link">
					<FileUrlEditor filePath={value} fileType={fileType} callback={update} />
				</Tab>
			</Tabs>
		</div>
	)
}
