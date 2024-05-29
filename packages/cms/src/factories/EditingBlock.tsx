import React from "react"
import BlockFactory from "./BlockFactory"
import ContentEditingWrapper from "../util/ContentEditingWrapper"

export default function EditingBlock(props: any) {

    return <ContentEditingWrapper>{BlockFactory.get(props)}</ContentEditingWrapper>

}