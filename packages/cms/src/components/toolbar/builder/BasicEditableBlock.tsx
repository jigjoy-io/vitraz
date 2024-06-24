import React from "react"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlock"

export default class BasicEditableBlock extends EditableBlockBuilder {

    editingOptions = []

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