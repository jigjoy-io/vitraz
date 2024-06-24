import React from "react"
import CTAEditingIcon from "../../../icons/CTAEditingIcon"
import DescriptionEditingIcon from "../../../icons/DescriptionEditingIcon"
import PriceEditingIcon from "../../../icons/PriceEditingIcon"
import TextEditingIcon from "../../../icons/TextEditingIcon"
import Toolbar from "../Toolbar"
import EditableBlock from "./EditableBlock"

export default class EditableCarousel extends EditableBlock {

    editingOptions = [{
        name: 'Edit title',
        icon: TextEditingIcon
    },{
        name: 'Edit description',
        icon: DescriptionEditingIcon
    },{
        name: 'Edit price',
        icon: PriceEditingIcon
    },{
        name: 'Edit call to action',
        icon: CTAEditingIcon
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