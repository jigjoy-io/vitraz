import React from "react"
import ColorEditingIcon from "../../../icons/color-editing-icon"
import CTAEditingIcon from "../../../icons/cta-editing-icon"
import DescriptionEditingIcon from "../../../icons/description-editing-icon"
import ColorEditor from "../editors/color-editor"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import ImageEditor from "../editors/image-editor"
import TextAreaEditor from "../editors/text-area-editor"
import LocalizedStrings from "react-localization"
import ButtonEditor from "../editors/button-editor"
import NavigationArrowIcon from "../../../icons/navigation-arrow-icon"
import RenameIcon from "../../../icons/rename-icon"
import { store } from "../../../util/store"

let localization = new LocalizedStrings({
    US: {
        rename: "Rename",
        editImage: "Image",
        editDescription: "Description",
        editCta: "Call-to-acition",
        editColor: "Position",
        editButtons: "Navigation Buttons"
    },
    RS: {
        rename: "Preimenuj",
        editImage: "Slika",
        editDescription: "Opis",
        editCta: "Poziv na akciju",
        editColor: "Boja",
        editButtons: "Dugmad za navigaciju"
    }
})

export default class EditableCarouselTile extends EditableBlock {

    getEditingOptions() {
        return [{
            name: localization.rename,
            icon: RenameIcon,
            key: 'title',
            editor: TextEditor
        }, {
            name: localization.editImage,
            icon: ImageEditingIcon,
            key: 'image',
            editor: ImageEditor
        }, {
            name: localization.editDescription,
            icon: DescriptionEditingIcon,
            key: 'description',
            editor: TextAreaEditor
        }, {
            name: localization.editCta,
            icon: CTAEditingIcon,
            key: 'cta',
            editor: TextEditor
        }, {
            name: localization.editButtons,
            icon: NavigationArrowIcon,
            key: 'buttons',
            editor: ButtonEditor
        }, {
            name: localization.editColor,
            icon: ColorEditingIcon,
            key: 'color',
            editor: ColorEditor
        }]
    }

    addToolbar(props: any) {
        const state = store.getState()
        localization.setLanguage(state.localization.language)

        this.block = <Toolbar id={props.id} block={props} editingOptions={this.getEditingOptions()} blockRadius="rounded-[20px]">{this.block}</Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
            .addToolbar(props)
            .addGap(props)
            .block
    }



} 