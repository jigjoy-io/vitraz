import React from "react"
import ImageEditor from "../editors/image-editor"
import PositionEditor from "../editors/position-editor"
import SizeEditor from "../editors/size-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import ImageIcon from "../../../../icons/image-icon"
import SizeIcon from "../../../../icons/size-icon"
import PositionIcon from "../../../../icons/position-icon"
import { store } from "../../../../util/store"

let localization = new LocalizedStrings({
	US: {
		editImage: "Image",
		editSize: "Size",
		editPosition: "Position",
	},
	RS: {
		editImage: "Slika",
		editSize: "Veličina",
		editPosition: "Pozicija",
	},
})
export default class EditableImage extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: localization.editImage,
				icon: ImageIcon,
				editor: ImageEditor,
				key: "source",
			},
			{
				name: localization.editSize,
				icon: SizeIcon,
				editor: SizeEditor,
				key: "size",
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
		return this.setBlock(props).addToolbar(props).addGap(props).block
	}
}
