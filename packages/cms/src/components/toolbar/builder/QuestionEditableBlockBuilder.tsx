import React from "react"
import AnswersEditingIcon from "../../../icons/AnswersEditingIcon"
import OutcomeMessageEditingIcon from "../../../icons/OutcomeMessageEditingIcon"
import TextEditingIcon from "../../../icons/TextEditingIcon"
import QuestionAnswersEditor from "../editors/QuestionAnswersEditor"
import QuestionContentEditor from "../editors/QuestionContentEditor"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class QuestionEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit question',
        type: 'selector',
        icon: TextEditingIcon,
        editor: QuestionContentEditor,
        key: 'content'
    },{
        name: 'Edit answers',
        type: 'selector',
        icon: AnswersEditingIcon,
        editor: QuestionAnswersEditor,
        key: 'answers'
    },{
        name: 'Edit outcomes',
        type: 'selector',
        icon: OutcomeMessageEditingIcon
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}><div>{this.block}</div></Toolbar>
        return this
    }

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .block
    }



} 