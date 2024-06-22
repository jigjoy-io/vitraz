import React, { ReactElement } from "react"
import BlockFactory from "../../../factories/BlockFactory"

export default abstract class EditableBlockBuilder {

    block: ReactElement

    abstract addToolbar(props: any): EditableBlockBuilder

    setBlock(props: any): EditableBlockBuilder {
        this.block = BlockFactory.get(props)
        return this
    }

    abstract createEditableBlock(props: any): ReactElement



} 