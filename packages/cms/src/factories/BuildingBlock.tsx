import React from "react"
import VisitorFactory from "./VisitorFactory"

export default function BuildingBlock(props: any){

    
    return <>{VisitorFactory.getVisitingBlock(props.mode, props)}</>
}