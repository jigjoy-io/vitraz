import React from "react"
import FileEditor from "./file-editor"

export default function AudioEditor(props: any) {
	return <FileEditor attribute={props.attribute} value={props.value} block={props.block} fileType="audio" />
}
