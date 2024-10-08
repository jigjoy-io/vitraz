import React from "react"
import AudioEditingIcon from "../../../icons/audio-editing-icon"
import ColorEditingIcon from "../../../icons/color-editing-icon"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import PositionEditingIcon from "../../../icons/position-editingI-icon"
import AudioEditor from "../editors/audio-editor"
import ColorEditor from "../editors/color-editor"
import PositionEditor from "../editors/position-editor"
import TextAreaEditor from "../editors/text-area-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"


let localization = new LocalizedStrings({
    en: {
        editMessage: "Edit image",
        editAudio: "Edit size",
        editColor: "Edit color",
        editPosition: "Edit position"
    },
    sr: {
        editMessage: "Izmeni poruku",
        editAudio: "Izmeni zvuk",
        editColor: "Izmeni boju",
        editPosition: "Izmeni poziciju"
    }
})

localization.setLanguage('sr')
export default class EditableMessage extends EditableBlock {

    editingOptions = [{
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