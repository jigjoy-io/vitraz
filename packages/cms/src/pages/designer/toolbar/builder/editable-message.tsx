import React from "react"
import AudioEditor from "../editors/audio-editor"
import ColorEditor from "../editors/color-editor"
import PositionEditor from "../editors/position-editor"
import TextAreaEditor from "../editors/text-area-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import MessageIcon from "../../../../icons/message-icon"
import AudioIcon from "../../../../icons/audio-icon"
import ColorIcon from "../../../../icons/color-icon"
import PositionIcon from "../../../../icons/position-icon"
import { store } from "../../../../util/store"

let localization = new LocalizedStrings({
	US: {
		editMessage: "Image",
		editAudio: "Audio",
		editColor: "Color",
		editPosition: "Position",
	},
	RS: {
		editMessage: "Poruka",
		editAudio: "Zvuk",
		editColor: "Boja",
		editPosition: "Pozicija",
	},
})

export default class EditableMessage extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: localization.editMessage,
				key: "message",
				icon: MessageIcon,
				editor: TextAreaEditor,
			},
			{
				name: localization.editAudio,
				key: "audio",
				icon: AudioIcon,
				editor: AudioEditor,
			},
			{
				name: localization.editColor,
				key: "color",
				icon: ColorIcon,
				editor: ColorEditor,
			},
			{
				name: localization.editPosition,
				key: "position",
				icon: PositionIcon,
				editor: PositionEditor,
			},
		]
	}

	addToolbar(props: any) {
		const state = store.getState()
		localization.setLanguage(state.localization.language)

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
