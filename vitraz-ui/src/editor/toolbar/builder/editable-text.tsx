import CenterAlignmentIcon from "../../../icons/alignment-center-icon"
import ContentEditingText from "../editors/content-editing-text"
import PositionEditor from "../editors/position-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"

export default class EditableText extends EditableBlock {
	getEditingOptions() {
		return [
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

	setBlock(props: any) {
		this.block = <ContentEditingText {...props} />
		return this
	}

	get(props: any): any {
		return this.setBlock(props).addToolbar(props).addGap(props).block
	}
}
