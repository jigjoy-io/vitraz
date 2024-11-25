import React from "react"
import AudioEditor from "../editors/audio-editor"
import PositionEditor from "../editors/position-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import AudioIcon from "../../../../icons/audio-icon"
import PositionIcon from "../../../../icons/position-icon"

export default class EditableAudio extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: "Audio",
				icon: AudioIcon,
				editor: AudioEditor,
				key: "source",
			},
			{
				name: "Position",
				icon: PositionIcon,
				editor: PositionEditor,
				key: "position",
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
