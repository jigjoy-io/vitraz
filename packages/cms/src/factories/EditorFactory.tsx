import React from "react"
import EditableAudio from "../components/toolbar/builder/EditableAudio"
import EditableCarouselTile from "../components/toolbar/builder/EditableCarouselTile"
import EditableImage from "../components/toolbar/builder/EditableImage"
import EditableMessage from "../components/toolbar/builder/EditableMessage"
import NoneEditableBlock from "../components/toolbar/builder/NoneEditableBlock"
import EditableProfile from "../components/toolbar/builder/EditableProfile"
import EditableQuestion from "../components/toolbar/builder/EditableQuestion"
import EditableReel from "../components/toolbar/builder/EditableReel"
import BasicEditableBlock from "../components/toolbar/builder/BasicEditableBlock"
import EditableText from "../components/toolbar/builder/EditableText"
import EditablePageTile from "../components/toolbar/builder/EditablePageTile"


export default class EditorFactory extends React.Component {

    static builders: any = {
        "text": {
            builder: new EditableText()
        },
        "heading": {
            builder: new EditableText()
        },
        "title": {
            builder: new EditableText()
        },
        "image": {
            builder: new EditableImage()
        },
        "button": {
            builder: new NoneEditableBlock()
        },
        "question": {
            builder: new EditableQuestion()
        },
        "profile": {
            builder: new EditableProfile()
        },
        "reel": {
            builder: new EditableReel()
        },
        "message": {
            builder: new EditableMessage()
        },
        "audio": {
            builder: new EditableAudio()
        },
        "carousel-tile": {
            builder: new EditableCarouselTile()
        },
        "cta": {
            builder: new NoneEditableBlock()
        },
        "carousel-configurer": {
            builder: new BasicEditableBlock()
        },
        "page-configurer": {
            builder: new BasicEditableBlock()
        },
        "page-tile": {
            builder: new EditablePageTile()
        },
        "block-selector": {
            builder: new BasicEditableBlock()
        }
    }

    static getEditableBlock(props: any) {
        let builder = this.builders[props.type].builder
        return builder.get(props)
    }
}