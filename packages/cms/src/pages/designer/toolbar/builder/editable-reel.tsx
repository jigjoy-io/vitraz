import React from "react"
import VideoEditor from "../editors/video-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import VideoIcon from "../../../../icons/video-icon"

export default class EditableReel extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: "Video",
				icon: VideoIcon,
				editor: VideoEditor,
				key: "source",
			},
		]
	}

	addToolbar(props: any) {
		this.block = (
			<Toolbar id={props.id} block={props} editingOptions={this.getEditingOptions()}>
				{this.block}
			</Toolbar>
		)
		return this
	}

	get(props: any): any {
		return this.setBlock(props).addToolbar(props).block
	}
}
