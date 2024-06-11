import React from "react"
import AnswersEditingIcon from "../../../icons/AnswersEditingIcon"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import OutcomeMessageEditingIcon from "../../../icons/OutcomeMessageEditingIcon"
import TextEditingIcon from "../../../icons/TextEditingIcon"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class QuestionEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit question text',
        type: 'selector',
        icon: TextEditingIcon
    },{
        name: 'Edit question image',
        type: 'selector',
        icon: ImageEditingIcon
    },{
        name: 'Edit answers',
        type: 'selector',
        icon: AnswersEditingIcon
    },{
        name: 'Edit outcome messages',
        type: 'selector',
        icon: OutcomeMessageEditingIcon
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} editingOptions={this.editingOptions}><div>{this.block}</div></Toolbar>
        return this
    }

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .block
    }



} 