import React from "react"

export default class EditorFactory extends React.Component {

    static buildingBlocks : any = {
        "text": {
            contentEditing: true
        },
        "heading": {
            contentEditing: true
        },
        "title": {
            contentEditing: true
        },
        "image": {
            contentEditing: false
        },
        "button": {
            contentEditing: false
        },
        "question": {
            contentEditing: false
        }
    }
    
    static get(props: any) {
        let block : any = this.buildingBlocks[props.type]
        return <block.component {...props}/>
    }
}