import React, { ReactElement } from "react"
import ContentEditingWrapper from "../../../util/ContentEditingWrapper"
import BlockFactory from "../../../factories/BlockFactory"

export default abstract class EditableBlockBuilder {

    block: ReactElement

    abstract addToolbar(props: any): EditableBlockBuilder

    enableContentEditing(): EditableBlockBuilder {
        this.block = <ContentEditingWrapper>{this.block}</ContentEditingWrapper>
        return this
    }

    setBlock(props: any): EditableBlockBuilder {
        this.block = BlockFactory.get(props)
        return this
    }

    abstract createEditableBlock(props: any): ReactElement



} 