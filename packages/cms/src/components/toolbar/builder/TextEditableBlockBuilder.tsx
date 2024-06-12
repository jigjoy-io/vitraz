import React from "react"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class TextEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit position',
        type: 'selector',
        icon: PositionEditingIcon
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .enableContentEditing()
                .addToolbar(props)
                .block
    }



} 