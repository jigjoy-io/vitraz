import React from "react"
import VideoEditingIcon from "../../../icons/VideoEditingIcon"
import VideoEditor from "../editors/VideoEditor"
import Toolbar from "../Toolbar"
import EditableBlock from "./EditableBlock"

export default class EditableReel extends EditableBlock {

    editingOptions = [{
        name: 'Edit video',
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