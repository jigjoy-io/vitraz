import React from "react"
import ColorEditor from "../editors/color-editor"
import ImageEditor from "../editors/image-editor"
import TextAreaEditor from "../editors/text-area-editor"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import ProfileIcon from "../../../icons/profile-icon"
import LocalizedStrings from "react-localization"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import DescriptionEditingIcon from "../../../icons/description-editing-icon"
import ColorEditingIcon from "../../../icons/color-editing-icon"
import RenameIcon from "../../../icons/rename-icon"
import { store } from "../../../util/store"
import LimitedTextEditor from "../editors/limited-text-editor"

let localization = new LocalizedStrings({
    US: {
        editHeadline: "Headline",
        editUsername: "Username",
        editImage: "Image",
        editDescription: "Description",
        editColor: "Color"
    },
    RS: {
        editHeadline: "Naslov",
        editUsername: "Korisničko ime",
        editImage: "Slika",
        editDescription: "Opis",
        editColor: "Boja"
    }
})
export default class EditableProfile extends EditableBlock {

    getEditingOptions() {
        return [{
            name: localization.editHeadline,
            icon: RenameIcon,
            key: 'headline',
            editor: LimitedTextEditor,
            extraProps: {
                limit: 30
            }
        }, {
            name: localization.editUsername,
            icon: ProfileIcon,
            key: 'username',
            editor: LimitedTextEditor,
            extraProps: {
                limit: 20
            }
        }, {
            name: localization.editImage,
            icon: ImageEditingIcon,
            key: 'image',
            editor: ImageEditor
        }, {
            name: localization.editDescription,
            key: 'description',
            icon: DescriptionEditingIcon,
            editor: TextAreaEditor
        }, {
            name: localization.editColor,
            icon: ColorEditingIcon,
            editor: ColorEditor,
            key: 'color'
        }]

    }

    addToolbar(props: any) {

        const state = store.getState()
        localization.setLanguage(state.localization.language)

        this.block = <Toolbar id={props.id} block={props} editingOptions={this.getEditingOptions()}><div>{this.block}</div></Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
            .addToolbar(props)
            .addGap(props)
            .block
    }



} 