import React from "react"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import RenameIcon from "../../../../icons/rename-icon"
import { store } from "../../../../util/store"
import InputTypeEditor from "../editors/input-type-editor"

let localization = new LocalizedStrings({
	US: {
		label: "Label",
		placeholder: "Placeholder",
		inputType: "Input Type",
	},
	RS: {
		label: "Oznaka",
		placeholder: "Poruka za unos",
		inputType: "Polje za unos",
	},
})

export default class EditableInput extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: localization.label,
				icon: RenameIcon,
				key: "label",
				editor: TextEditor,
			},
			{
				name: localization.placeholder,
				icon: RenameIcon,
				key: "placeholder",
				editor: TextEditor,
			},
			{
				name: localization.inputType,
				icon: RenameIcon,
				key: "inputType",
				editor: InputTypeEditor,
			},
		]
	}

	addToolbar(props: any) {
		const state = store.getState()
		localization.setLanguage(state.localization.language)

		this.block = (
			<Toolbar id={props.id} block={props} editingOptions={this.getEditingOptions()} blockRadius="rounded-[20px]">
				{this.block}
			</Toolbar>
		)
		return this
	}

	get(props: any): any {
		return this.setBlock(props).addToolbar(props).addGap(props).block
	}
}
