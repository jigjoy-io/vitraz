import React from "react"
import EditorFactory from "./editor-factory"

export default function EditingBlock(props: any) {

    return <>{EditorFactory.getEditableBlock(props) }</>

}