import React from "react"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import DefaultToolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class TextEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit position',
        type: 'selector',
        icon: PositionEditingIcon
    }]

    addToolbar(props: any) {
        this.block = <DefaultToolbar id={props.id} editingOptions={this.editingOptions}>{this.block}</DefaultToolbar>
        return this
    }

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .enableContentEditing()
                .addToolbar(props)
                .block
    }



} 