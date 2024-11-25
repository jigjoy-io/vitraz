import React from "react"
import ColorEditor from "../editors/color-editor"
import ImageEditor from "../editors/image-editor"
import TextAreaEditor from "../editors/text-area-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LimitedTextEditor from "../editors/limited-text-editor"
import RenameIcon from "../../../../icons/rename-icon"
import ProfileIcon from "../../../../icons/profile-icon"
import ImageIcon from "../../../../icons/image-icon"
import DescriptionIcon from "../../../../icons/description-icon"
import ColorIcon from "../../../../icons/color-icon"

export default class EditableProfile extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: "First Name",
				icon: RenameIcon,
				key: "firstName",
				editor: LimitedTextEditor,
				extraProps: {
					limit: 20,
				},
			},
			{
				name: "Last Name",
				icon: RenameIcon,
				key: "lastName",
				editor: LimitedTextEditor,
				extraProps: {
					limit: 20,
				},
			},
			{
				name: "Username",
				icon: ProfileIcon,
				key: "username",
				editor: LimitedTextEditor,
				extraProps: {
					limit: 20,
				},
			},
			{
				name: "Image",
				icon: ImageIcon,
				key: "image",
				editor: ImageEditor,
			},
			{
				name: "Description",
				key: "description",
				icon: DescriptionIcon,
				editor: TextAreaEditor,
			},
			{
				name: "Color",
				icon: ColorIcon,
				editor: ColorEditor,
				key: "color",
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
