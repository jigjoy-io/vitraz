import React, { useState } from "react"
import { useSelector } from "react-redux"
import VisitorFactory from "./VisitorFactory"

export default function BuildingBlock(props: any){

    const [visitor, setVisitor] = useState(props.mode)
    //const visitor = useSelector((state: any) => props.mode)
    
    return <>{visitor && VisitorFactory.getVisitingBlock(visitor, props)}</>
}