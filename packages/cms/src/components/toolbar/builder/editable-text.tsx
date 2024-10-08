import React from "react"
import PositionEditingIcon from "../../../icons/position-editingI-icon"
import ContentEditingText from "../editors/content-editing-text"
import PositionEditor from "../editors/position-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    en: {
        editPosition: "Edit position"
    },
    sr: {
        editPosition: "Izmeni poziciju"
    }
})

localization.setLanguage('sr')
export default class EditableText extends EditableBlock {


    editingOptions = [{
        name: localization.editPosition,
        icon: PositionEditingIcon,
        editor: PositionEditor,
        key: 'position'
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    setBlock (props: any){
        this.block = <ContentEditingText {...props} />
        return this
    }

    get(props: any): any {
        return this.setBlock(props)
            .addToolbar(props)
            .addGap(props)
            .block
    }



} 