import React from "react"
import ContentEditingText from "../editors/content-editing-text"
import PositionEditor from "../editors/position-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import PositionIcon from "../../../../icons/position-icon"
import { store } from "../../../../util/store"

let localization = new LocalizedStrings({
	US: {
		editPosition: "Position",
	},
	RS: {
		editPosition: "Pozicija",
	},
})

export default class EditableText extends EditableBlock {
	getEditingOptions() {
		return [
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

	setBlock(props: any) {
		this.block = <ContentEditingText {...props} />
		return this
	}

	get(props: any): any {
		return this.setBlock(props).addToolbar(props).addGap(props).block
	}
}
