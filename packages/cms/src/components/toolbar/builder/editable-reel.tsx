import React from "react"
import VideoEditingIcon from "../../../icons/video-editing-icon"
import VideoEditor from "../editors/video-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    en: {
        editVideo: "Edit video"
    },
    sr: {
        editVideo: "Izmeni video"
    }
})

localization.setLanguage('sr')
export default class EditableReel extends EditableBlock {

    editingOptions = [{
        name: localization.editVideo,
        icon: VideoEditingIcon,
        editor: VideoEditor,
        key: 'source'
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