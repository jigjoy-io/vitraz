import React from "react"
import AnswersEditingIcon from "../../../icons/answers-editing-icon"
import OutcomeMessageEditingIcon from "../../../icons/outcome-message-editing-icon"
import { RenameIcon } from "../../../icons/rename-icon"
import QuestionAnswersEditor from "../editors/question-answers-editor"
import QuestionContentEditor from "../editors/question-content-editor"
import QuestionOutcomesEditor from "../editors/question-outcomes-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    en: {
        editQuestion: "Edit question",
        editAnswers: "Edit answers",
        editOutcomes: "Edit outcomes"
    },
    sr: {
        editQuestion: "Izmeni pitanje",
        editAnswers: "Izmeni odgovore",
        editOutcomes: "Izmeni poruke"
    }
})

localization.setLanguage('sr')

export default class EditableQuestion extends EditableBlock {


    editingOptions = [{
        name: localization.editQuestion,
        icon: RenameIcon,
        editor: QuestionContentEditor,
        key: 'content'
    },{
        name: localization.editAnswers,
        icon: AnswersEditingIcon,
        editor: QuestionAnswersEditor,
        key: 'answers'
    },{
        name: localization.editOutcomes,
        icon: OutcomeMessageEditingIcon,
        key: 'outcomes',
        editor: QuestionOutcomesEditor
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}><div>{this.block}</div></Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .addGap(props)
                .block
    }



} 