import React from "react"
import AudioEditor from "../editors/audio-editor"
import ColorEditor from "../editors/color-editor"
import PositionEditor from "../editors/position-editor"
import TextAreaEditor from "../editors/text-area-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"
import PositionEditingIcon from "../../../icons/position-editing-icon"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import AudioEditingIcon from "../../../icons/audio-editing-icon"
import ColorEditingIcon from "../../../icons/color-editing-icon"
import { store } from "../../../util/store"


let localization = new LocalizedStrings({
    US: {
        editMessage: "Image",
        editAudio: "Audio",
        editColor: "Color",
        editPosition: "Position"
    },
    RS: {
        editMessage: "Poruka",
        editAudio: "Zvuk",
        editColor: "Boja",
        editPosition: "Pozicija"
    }
})

export default class EditableMessage extends EditableBlock {

    getEditingOptions() {
        return [{
            name: localization.editMessage,
            key: 'message',
            icon: ImageEditingIcon,
            editor: TextAreaEditor
        }, {
            name: localization.editAudio,
            key: 'audio',
            icon: AudioEditingIcon,
            editor: AudioEditor
        }, {
            name: localization.editColor,
            key: 'color',
            icon: ColorEditingIcon,
            editor: ColorEditor
        }, {
            name: localization.editPosition,
            key: 'position',
            icon: PositionEditingIcon,
            editor: PositionEditor
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