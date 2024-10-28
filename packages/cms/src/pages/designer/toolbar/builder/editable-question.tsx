import React from "react"
import QuestionAnswersEditor from "../editors/question-answers-editor"
import QuestionContentEditor from "../editors/question-content-editor"
import QuestionOutcomesEditor from "../editors/question-outcomes-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import RenameIcon from "../../../../icons/rename-icon"
import AnswersIcon from "../../../../icons/answers-icon"
import OutcomeMessageIcon from "../../../../icons/outcome-message-icon"
import { store } from "../../../../util/store"

let localization = new LocalizedStrings({
	US: {
		editQuestion: "Question",
		editAnswers: "Answers",
		editOutcomes: "Outcomes",
	},
	RS: {
		editQuestion: "Pitanje",
		editAnswers: "Odgovori",
		editOutcomes: "Poruke",
	},
})
export default class EditableQuestion extends EditableBlock {
	getEditingOptions() {
		return [
			{
				name: localization.editQuestion,
				icon: RenameIcon,
				editor: QuestionContentEditor,
				key: "content",
			},
			{
				name: localization.editAnswers,
				icon: AnswersIcon,
				editor: QuestionAnswersEditor,
				key: "answers",
			},
			{
				name: localization.editOutcomes,
				icon: OutcomeMessageIcon,
				key: "outcomes",
				editor: QuestionOutcomesEditor,
			},
		]
	}

	addToolbar(props: any) {
		const state = store.getState()
		localization.setLanguage(state.localization.language)

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
