import React from "react"
import ColorEditor from "../editors/color-editor"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import ImageEditor from "../editors/image-editor"
import TextAreaEditor from "../editors/text-area-editor"
import ButtonEditor from "../editors/button-editor"
import RenameIcon from "@jigjoy-ui/icons/rename-icon"
import ImageIcon from "@jigjoy-ui/icons/image-icon"
import CTAIcon from "@jigjoy-ui/icons/cta-icon"
import DescriptionIcon from "@jigjoy-ui/icons/description-icon"
import NavigationArrowIcon from "@jigjoy-ui/icons/navigation-arrow-icon"
import ColorIcon from "@jigjoy-ui/icons/color-icon"

export default class EditableCarouselTile extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: "Rename",
				icon: RenameIcon,
				key: "title",
				editor: TextEditor,
			},
			{
				name: "Image",
				icon: ImageIcon,
				key: "image",
				editor: ImageEditor,
			},
			{
				name: "Description",
				icon: DescriptionIcon,
				key: "description",
				editor: TextAreaEditor,
			},
			{
				name: "Call-to-acition",
				icon: CTAIcon,
				key: "cta",
				editor: TextEditor,
			},
			{
				name: "Navigation Buttons",
				icon: NavigationArrowIcon,
				key: "buttons",
				editor: ButtonEditor,
			},
			{
				name: "Color",
				icon: ColorIcon,
				key: "color",
				editor: ColorEditor,
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
