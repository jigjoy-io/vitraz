import ImageEditor from "../editors/image-editor"
import PositionEditor from "../editors/position-editor"
import SizeEditor from "../editors/size-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import SizeIcon from "../../../icons/size-icon"
import ImageIcon from "../../../building-blocks/image/image.icon"
import CenterAlignmentIcon from "../../../icons/alignment-center-icon"

export default class EditableImage extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: "Image",
				icon: ImageIcon,
				editor: ImageEditor,
				key: "source",
			},
			{
				name: "Size",
				icon: SizeIcon,
				editor: SizeEditor,
				key: "size",
			},
			{
				name: "Position",
				icon: CenterAlignmentIcon,
				editor: PositionEditor,
				key: "position",
			},
		]
	}

	addToolbar(props: any) {
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
