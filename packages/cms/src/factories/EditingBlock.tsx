import React from "react"
import BlockFactory from "./BlockFactory"
import ContentEditingWrapper from "../util/ContentEditingWrapper"
import DefaultToolbar from "../components/toolbar/DefaultToolbar"

export default function EditingBlock(props: any) {

    return <DefaultToolbar id={props.id}>
        <ContentEditingWrapper>
            {BlockFactory.get(props)}
        </ContentEditingWrapper>
    </DefaultToolbar>

}