import React from "react"
import ColorEditingIcon from "../../../icons/ColorEditingIcon"
import CTAEditingIcon from "../../../icons/CTAEditingIcon"
import DescriptionEditingIcon from "../../../icons/DescriptionEditingIcon"
import { RenameIcon } from "../../../icons/RenameIcon"
import ColorEditor from "../editors/ColorEditor"
import TextEditor from "../editors/TextEditor"
import Toolbar from "../Toolbar"
import EditableBlock from "./EditableBlock"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import ImageEditor from "../editors/ImageEditor"

export default class EditableCarouselTile extends EditableBlock {

    editingOptions = [{
        name: 'Rename',
        icon: RenameIcon,
        key: 'title',
        editor: TextEditor
    },{
        name: 'Edit image',
        icon: ImageEditingIcon,
        key: 'image',
        editor: ImageEditor
    },{
        name: 'Edit description',
        icon: DescriptionEditingIcon,
        key: 'description',
        editor: TextEditor
    },{
        name: 'Edit call to action',
        icon: CTAEditingIcon,
        key: 'cta',
        editor: TextEditor
    },{
        name: 'Edit color',
        icon: ColorEditingIcon,
        key: 'color',
        editor: ColorEditor
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions} blockRadius="rounded-[20px]">{this.block}</Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .addGap(props)
                .block
    }



} 