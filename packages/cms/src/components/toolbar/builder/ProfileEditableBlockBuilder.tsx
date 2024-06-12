import React from "react"
import ColorEditingIcon from "../../../icons/ColorEditingIcon"
import DescriptionEditingIcon from "../../../icons/DescriptionEditingIcon"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import TextEditingIcon from "../../../icons/TextEditingIcon"
import ColorEditor from "../editors/ColorEditor"
import TextAreaEditor from "../editors/TextAreaEditor"
import TextEditor from "../editors/TextEditor"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class ProfileEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit headline',
        type: 'selector',
        icon: TextEditingIcon,
        key: 'headline',
        editor: TextEditor
    },{
        name: 'Edit image',
        type: 'selector',
        icon: ImageEditingIcon
    },{
        name: 'Edit description',
        type: 'selector',
        key: 'description',
        icon: DescriptionEditingIcon,
        editor: TextAreaEditor
    },{
        name: 'Edit color',
        type: 'selector',
        icon: ColorEditingIcon,
        editor: ColorEditor,
        key: 'color'
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