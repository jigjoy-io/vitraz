import React from "react"
import AudioEditor from "../editors/audio-editor"
import PositionEditor from "../editors/position-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import AudioIcon from "../../../../icons/audio-icon"
import PositionIcon from "../../../../icons/position-icon"
import { store } from "../../../../util/store"

let localization = new LocalizedStrings({
	US: {
		editAudio: "Audio",
		editPosition: "Position",
	},
	RS: {
		editAudio: "Zvuk",
		editPosition: "Pozicija",
	},
})

export default class EditableAudio extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: localization.editAudio,
				icon: AudioIcon,
				editor: AudioEditor,
				key: "source",
			},
			{
				name: localization.editPosition,
				icon: PositionIcon,
				editor: PositionEditor,
				key: "position",
			},
		]
	}

	addToolbar(props: any) {
		const state = store.getState()
		localization.setLanguage(state.localization.language)

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
