import React from "react"
import AudioEditingIcon from "../../../icons/AudioEditingIcon"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import DefaultToolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class AudioEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit audio',
        type: 'selector',
        icon: AudioEditingIcon
    }, {
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
                .addToolbar(props)
                .block
    }



} 