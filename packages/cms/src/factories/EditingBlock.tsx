import React from "react"
import EditorFactory from "./EditorFactory"

export default function EditingBlock(props: any) {

    return <>{EditorFactory.getEditableBlock(props) }</>

}