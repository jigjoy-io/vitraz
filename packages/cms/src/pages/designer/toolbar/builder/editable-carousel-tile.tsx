import React from "react"
import ColorEditor from "../editors/color-editor"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import ImageEditor from "../editors/image-editor"
import TextAreaEditor from "../editors/text-area-editor"
import LocalizedStrings from "react-localization"
import ButtonEditor from "../editors/button-editor"
import RenameIcon from "../../../../icons/rename-icon"
import ImageIcon from "../../../../icons/image-icon"
import CTAIcon from "../../../../icons/cta-icon"
import DescriptionIcon from "../../../../icons/description-icon"
import NavigationArrowIcon from "../../../../icons/navigation-arrow-icon"
import ColorIcon from "../../../../icons/color-icon"
import { store } from "../../../../util/store"

let localization = new LocalizedStrings({
    US: {
        rename: "Rename",
        editImage: "Image",
        editDescription: "Description",
        editCta: "Call-to-acition",
        editColor: "Color",
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
            icon: ImageIcon,
            key: 'image',
            editor: ImageEditor
        }, {
            name: localization.editDescription,
            icon: DescriptionIcon,
            key: 'description',
            editor: TextAreaEditor
        }, {
            name: localization.editCta,
            icon: CTAIcon,
            key: 'cta',
            editor: TextEditor
        }, {
            name: localization.editButtons,
            icon: NavigationArrowIcon,
            key: 'buttons',
            editor: ButtonEditor
        }, {
            name: localization.editColor,
            icon: ColorIcon,
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