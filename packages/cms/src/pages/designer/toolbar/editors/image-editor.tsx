import React from "react"
import FileEditor from "../../../designer/toolbar/editors/file-editor"

export default function ImageEditor(props: any) {
	return <FileEditor attribute={props.attribute} value={props.value} block={props.block} fileType="image" />
}
