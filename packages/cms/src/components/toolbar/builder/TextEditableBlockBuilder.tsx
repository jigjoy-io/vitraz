import React from "react"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import ContentEditingText from "../editors/ContentEditingText"
import PositionEditor from "../editors/PositionEditor"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class TextEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit position',
        icon: PositionEditingIcon,
        editor: PositionEditor,
        key: 'position'
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    setBlock (props: any){
        this.block = <ContentEditingText {...props} />
        return this
    }

    createEditableBlock(props: any): any {
        return this.setBlock(props)
            .addToolbar(props)
            .block
    }



} 