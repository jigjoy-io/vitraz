import React from "react"
import AudioEditingIcon from "../../../icons/AudioEditingIcon"
import ColorEditingIcon from "../../../icons/ColorEditingIcon"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import TextAreaEditor from "../editors/TextAreaEditor"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class MessageEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit message',
        key: 'message',
        icon: ImageEditingIcon,
        editor: TextAreaEditor
    }, {
        name: 'Edit audio',
        type: 'selector',
        icon: AudioEditingIcon
    }, {
        name: 'Edit color',
        type: 'selector',
        icon: ColorEditingIcon,
        editor: TextAreaEditor
    }, {
        name: 'Edit position',
        type: 'selector',
        icon: PositionEditingIcon
    }]

    addToolbar(props: any) {
        this.block = <Toolbar key={props.id} id={props.id} block={props} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .block
    }



} 