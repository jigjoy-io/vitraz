import React from "react"
import BlockFactory from "./BlockFactory"

export default function ViewOnlyBlock(props: any) {


    return <>{BlockFactory.get(props)}</>

}