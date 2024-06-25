import React from "react"
import AudioEditingIcon from "../../../icons/AudioEditingIcon"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import AudioEditor from "../editors/AudioEditor"
import PositionEditor from "../editors/PositionEditor"
import Toolbar from "../Toolbar"
import EditableBlock from "./EditableBlock"

export default class EditableAudio extends EditableBlock {

    editingOptions = [{
        name: 'Edit audio',
        icon: AudioEditingIcon,
        editor: AudioEditor,
        key: 'source'
    }, {
        name: 'Edit position',
        icon: PositionEditingIcon,
        editor: PositionEditor,
        key: 'position'
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .block
    }



} 