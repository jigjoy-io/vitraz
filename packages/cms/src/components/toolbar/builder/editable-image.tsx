import React from "react"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import PositionEditingIcon from "../../../icons/position-editingI-icon"
import SizeIcon from "../../../icons/size-icon"
import ImageEditor from "../editors/image-editor"
import PositionEditor from "../editors/position-editor"
import SizeEditor from "../editors/size-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"



let localization = new LocalizedStrings({
    en: {
        editImage: "Edit image",
        editSize: "Edit size",
        editPosition: "Edit position"
    },
    sr: {
        editImage: "Izmeni sliku",
        editSize: "Izmeni velićinu",
        editPosition: "Izmeni poziciju"
    }
})

localization.setLanguage('sr')

export default class EditableImage extends EditableBlock {


    editingOptions = [{
        name: localization.editImage,
        icon: ImageEditingIcon,
        editor: ImageEditor,
        key: 'source'
    }, {
        name: localization.editSize,
        icon: SizeIcon,
        editor: SizeEditor,
        key: "size"
    }, {
        name: localization.editPosition,
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
                .addGap(props)
                .block
    }



} 