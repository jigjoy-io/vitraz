import React from "react"
import QuestionAnswersEditor from "../editors/question-answers-editor"
import QuestionContentEditor from "../editors/question-content-editor"
import QuestionOutcomesEditor from "../editors/question-outcomes-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import RenameIcon from "../../../../icons/rename-icon"
import AnswersIcon from "../../../../icons/answers-icon"
import OutcomeMessageIcon from "../../../../icons/outcome-message-icon"
export default class EditableQuestion extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: "Question",
				icon: RenameIcon,
				editor: QuestionContentEditor,
				key: "content",
			},
			{
				name: "Answers",
				icon: AnswersIcon,
				editor: QuestionAnswersEditor,
				key: "answers",
			},
			{
				name: "Outcomes",
				icon: OutcomeMessageIcon,
				key: "outcomes",
				editor: QuestionOutcomesEditor,
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
