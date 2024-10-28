import React from "react"
import VideoEditor from "../editors/video-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import VideoIcon from "../../../../icons/video-icon"
import { store } from "../../../../util/store"

let localization = new LocalizedStrings({
	US: {
		editVideo: "Video",
	},
	RS: {
		editVideo: "Snimak",
	},
})

export default class EditableReel extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: localization.editVideo,
				icon: VideoIcon,
				editor: VideoEditor,
				key: "source",
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
