import React from "react"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class ImageEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit image',
        type: 'selector',
        icon: ImageEditingIcon
    }, {
        name: 'Edit position',
        type: 'selector',
        icon: PositionEditingIcon
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .block
    }



} 