import React from "react"
import PlainBlockFactory from "./plain-block-factory"

export default function ViewOnlyBlock(props: any) {


    return <>{PlainBlockFactory.getBlock(props)}</>

}