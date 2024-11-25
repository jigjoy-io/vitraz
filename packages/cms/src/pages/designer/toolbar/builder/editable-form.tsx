import React from "react"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import RenameIcon from "../../../../icons/rename-icon"
import InputTypeEditor from "../editors/input-type-editor"

export default class EditableForm extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: "Label",
				icon: RenameIcon,
				key: "label",
				editor: TextEditor,
			},
			{
				name: "Placeholder",
				icon: RenameIcon,
				key: "placeholder",
				editor: TextEditor,
			},
			{
				name: "Input Type",
				icon: RenameIcon,
				key: "inputType",
				editor: InputTypeEditor,
			},
		]
	}

	addToolbar(props: any) {
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
