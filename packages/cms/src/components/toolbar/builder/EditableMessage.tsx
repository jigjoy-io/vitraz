import React from "react"
import AudioEditingIcon from "../../../icons/AudioEditingIcon"
import ColorEditingIcon from "../../../icons/ColorEditingIcon"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import AudioEditor from "../editors/AudioEditor"
import ColorEditor from "../editors/ColorEditor"
import PositionEditor from "../editors/PositionEditor"
import TextAreaEditor from "../editors/TextAreaEditor"
import Toolbar from "../Toolbar"
import EditableBlock from "./EditableBlock"

export default class EditableMessage extends EditableBlock {

    editingOptions = [{
        name: 'Edit message',
        key: 'message',
        icon: ImageEditingIcon,
        editor: TextAreaEditor
    }, {
        name: 'Edit audio',
        key: 'audio',
        icon: AudioEditingIcon,
        editor: AudioEditor
    }, {
        name: 'Edit color',
        key: 'color',
        icon: ColorEditingIcon,
        editor: ColorEditor
    }, {
        name: 'Edit position',
        key: 'position',
        icon: PositionEditingIcon,
        editor: PositionEditor
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