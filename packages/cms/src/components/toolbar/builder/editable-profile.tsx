import React from "react"
import ColorEditingIcon from "../../../icons/color-editing-icon"
import DescriptionEditingIcon from "../../../icons/description-editing-icon"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import { RenameIcon } from "../../../icons/rename-icon"
import ColorEditor from "../editors/color-editor"
import ImageEditor from "../editors/image-editor"
import TextAreaEditor from "../editors/text-area-editor"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import ProfileIcon from "../../../icons/profile-icon"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    en: {
        editHeadline: "Edit headline",
        editUsername: "Edit username",
        editImage: "Edit image",
        editDescription: "Edit description",
        editColor: "Edit position"
    },
    sr: {
        editHeadline: "Izmeni naslov",
        editUsername: "Izmeni korisničko ime",
        editImage: "Izmeni sliku",
        editDescription: "Izmeni opis",
        editCta: "Izmeni tekst dugmeta",
        editColor: "Izmeni boju"
    }
})

localization.setLanguage('sr')
export default class EditableProfile extends EditableBlock {

    editingOptions = [{
        name: localization.editHeadline,
        icon: RenameIcon,
        key: 'headline',
        editor: TextEditor
    },{
        name: localization.editUsername,
        icon: ProfileIcon,
        key: 'username',
        editor: TextEditor
    },{
        name: localization.editImage,
        icon: ImageEditingIcon,
        key: 'image',
        editor: ImageEditor
    },{
        name: localization.editDescription,
        key: 'description',
        icon: DescriptionEditingIcon,
        editor: TextAreaEditor
    },{
        name: localization.editColor,
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