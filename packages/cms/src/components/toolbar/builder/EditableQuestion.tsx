import React from "react"
import AnswersEditingIcon from "../../../icons/AnswersEditingIcon"
import OutcomeMessageEditingIcon from "../../../icons/OutcomeMessageEditingIcon"
import TextEditingIcon from "../../../icons/TextEditingIcon"
import QuestionAnswersEditor from "../editors/QuestionAnswersEditor"
import QuestionContentEditor from "../editors/QuestionContentEditor"
import QuestionOutcomesEditor from "../editors/QuestionOutcomesEditor"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlock"

export default class EditableQuestion extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit question',
        icon: TextEditingIcon,
        editor: QuestionContentEditor,
        key: 'content'
    },{
        name: 'Edit answers',
        icon: AnswersEditingIcon,
        editor: QuestionAnswersEditor,
        key: 'answers'
    },{
        name: 'Edit outcomes',
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
                .block
    }



} 