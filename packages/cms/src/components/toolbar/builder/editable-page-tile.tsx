import React from "react"
import ColorEditingIcon from "../../../icons/color-editing-icon"
import CTAEditingIcon from "../../../icons/cta-editing-icon"
import DescriptionEditingIcon from "../../../icons/description-editing-icon"
import { RenameIcon } from "../../../icons/rename-icon"
import ColorEditor from "../editors/color-editor"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import ImageEditor from "../editors/image-editor"
import TextAreaEditor from "../editors/text-area-editor"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    en: {
        rename: "Rename",
        editImage: "Edit image",
        editDescription: "Edit description",
        editCta: "Edit call-to-acition",
        editColor: "Edit position"
    },
    sr: {
        rename: "Preimenuj",
        editImage: "Izmeni sliku",
        editDescription: "Izmeni opis",
        editCta: "Izmeni tekst dugmeta",
        editColor: "Izmeni boju"
    }
})

localization.setLanguage('sr')

export default class EditablePageTile extends EditableBlock {

    editingOptions = [{
        name: localization.rename,
        icon: RenameIcon,
        key: 'title',
        editor: TextEditor
    },{
        name: localization.editImage,
        icon: ImageEditingIcon,
        key: 'image',
        editor: ImageEditor
    },{
        name: localization.editDescription,
        icon: DescriptionEditingIcon,
        key: 'description',
        editor: TextAreaEditor
    },{
        name: localization.editCta,
        icon: CTAEditingIcon,
        key: 'cta',
        editor: TextEditor
    },{
        name: localization.editColor,
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