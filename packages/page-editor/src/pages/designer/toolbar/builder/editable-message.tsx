import React from "react"
import AudioEditor from "../editors/audio-editor"
import ColorEditor from "../editors/color-editor"
import PositionEditor from "../editors/position-editor"
import TextAreaEditor from "../editors/text-area-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import MessageIcon from "../../../../icons/message-icon"
import AudioIcon from "../../../../icons/audio-icon"
import ColorIcon from "../../../../icons/color-icon"
import PositionIcon from "../../../../icons/position-icon"

export default class EditableMessage extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: "Message",
				key: "message",
				icon: MessageIcon,
				editor: TextAreaEditor,
			},
			{
				name: "Audio",
				key: "audio",
				icon: AudioIcon,
				editor: AudioEditor,
			},
			{
				name: "Color",
				key: "color",
				icon: ColorIcon,
				editor: ColorEditor,
			},
			{
				name: "Position",
				key: "position",
				icon: PositionIcon,
				editor: PositionEditor,
			},
		]
	}

	addToolbar(props: any) {
		this.block = (
			<Toolbar id={props.id} block={props} editingOptions={this.getEditingOptions()}>
				<div>{this.block}</div>
			</Toolbar>
		)
		return this
	}

	get(props: any): any {
		return this.setBlock(props).addToolbar(props).addGap(props).block
	}
}
