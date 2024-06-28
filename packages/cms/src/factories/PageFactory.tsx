import React from "react"
import CarouselPage from "../components/carousel/CarouselPage"
import BlankPage from "../components/page/BlankPage"

export class PageFactory extends React.Component {

    static layouts : any = {
        "carousel": {
            component: CarouselPage
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