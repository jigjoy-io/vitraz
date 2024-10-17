import React from "react"
import ColorEditor from "../editors/color-editor"
import ImageEditor from "../editors/image-editor"
import TextAreaEditor from "../editors/text-area-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import LimitedTextEditor from "../editors/limited-text-editor"
import RenameIcon from "../../../../icons/rename-icon"
import ProfileIcon from "../../../../icons/profile-icon"
import ImageIcon from "../../../../icons/image-icon"
import DescriptionIcon from "../../../../icons/description-icon"
import ColorIcon from "../../../../icons/color-icon"
import { store } from "../../../../util/store"

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
            icon: ImageIcon,
            key: 'image',
            editor: ImageEditor
        }, {
            name: localization.editDescription,
            key: 'description',
            icon: DescriptionIcon,
            editor: TextAreaEditor
        }, {
            name: localization.editColor,
            icon: ColorIcon,
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