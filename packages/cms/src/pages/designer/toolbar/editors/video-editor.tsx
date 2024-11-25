import React from "react"
import FileEditor from "./file-editor"

export default function VideoEditor(props: any) {
	return <FileEditor attribute={props.attribute} value={props.value} block={props.block} fileType="video" />
}
