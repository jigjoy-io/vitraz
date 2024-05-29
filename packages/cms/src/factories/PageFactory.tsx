import React from "react"
import ChapterPage from "../components/chapter/ChapterPage"
import BlankPage from "../components/pages/BlankPage"

export class PageFactory extends React.Component {

    static layouts : any = {
        "chapter": {
            component: ChapterPage
        },
        "blank": {
            component: BlankPage
        }
    }
    
    static get(props: any) {
        let layout : any = this.layouts[props.type]
        return <layout.component {...props} key={props.id}/> 
    }
}