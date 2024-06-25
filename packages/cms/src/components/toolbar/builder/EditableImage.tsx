import React from "react"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import SizeIcon from "../../../icons/SizeIcon"
import ImageEditor from "../editors/ImageEditor"
import PositionEditor from "../editors/PositionEditor"
import SizeEditor from "../editors/SizeEditor"
import Toolbar from "../Toolbar"
import EditableBlock from "./EditableBlock"

export default class EditableImage extends EditableBlock {


    editingOptions = [{
        name: 'Edit image',
        icon: ImageEditingIcon,
        editor: ImageEditor,
        key: 'source'
    }, {
        name: 'Edit size',
        icon: SizeIcon,
        editor: SizeEditor,
        key: "size"
    }, {
        name: 'Edit position',
        icon: PositionEditingIcon,
        editor: PositionEditor,
        key: "position"
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