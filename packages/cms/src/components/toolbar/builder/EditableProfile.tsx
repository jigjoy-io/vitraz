import React from "react"
import ColorEditingIcon from "../../../icons/ColorEditingIcon"
import DescriptionEditingIcon from "../../../icons/DescriptionEditingIcon"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import TextEditingIcon from "../../../icons/TextEditingIcon"
import ColorEditor from "../editors/ColorEditor"
import ImageEditor from "../editors/ImageEditor"
import TextAreaEditor from "../editors/TextAreaEditor"
import TextEditor from "../editors/TextEditor"
import Toolbar from "../Toolbar"
import EditableBlock from "./EditableBlock"

export default class EditableProfile extends EditableBlock {

    editingOptions = [{
        name: 'Edit headline',
        icon: TextEditingIcon,
        key: 'headline',
        editor: TextEditor
    },{
        name: 'Edit image',
        icon: ImageEditingIcon,
        key: 'image',
        editor: ImageEditor
    },{
        name: 'Edit description',
        key: 'description',
        icon: DescriptionEditingIcon,
        editor: TextAreaEditor
    },{
        name: 'Edit color',
        icon: ColorEditingIcon,
        editor: ColorEditor,
        key: 'color'
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