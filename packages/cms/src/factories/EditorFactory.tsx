import React, { lazy, Suspense } from "react"
import AudioEditableBlockBuilder from "../components/toolbar/builder/AudioEditableBlockBuilder"
import ChapterEditableBlockBuilder from "../components/toolbar/builder/ChapterEditableBlockBuilder"
import ImageEditableBlockBuilder from "../components/toolbar/builder/ImageEditableBlockBuilder"
import QuestionEditableBlockBuilder from "../components/toolbar/builder/QuestionEditableBlockBuilder"
import TextEditableBlockBuilder from "../components/toolbar/builder/TextEditableBlockBuilder"


export default class EditorFactory extends React.Component {

    static builders: any = {
        "text": {
            builder: new TextEditableBlockBuilder()
        },
        "heading": {
            builder: new TextEditableBlockBuilder()
        },
        "title": {
            builder: new TextEditableBlockBuilder()
        },
        "image": {
            builder: new ImageEditableBlockBuilder()
        },
        "button": {
            builder: new TextEditableBlockBuilder()
        },
        "question": {
            builder: new QuestionEditableBlockBuilder()
        },
        "profile": {
            builder: new TextEditableBlockBuilder()
        },
        "reel": {
            builder: new ImageEditableBlockBuilder()
        },
        "message": {
            builder: new ImageEditableBlockBuilder()
        },
        "audio": {
            builder: new AudioEditableBlockBuilder()
        },
        "chapter": {
            builder: new ChapterEditableBlockBuilder()
        }
    }

    static getEditableBlock(props: any) {
        let builder = this.builders[props.type].builder
        return builder.createEditableBlock(props)
    }
}