import React from "react"
import PlainBlockFactory from "./PlainBlockFactory"

export default function ViewOnlyBlock(props: any) {


    return <>{PlainBlockFactory.getBlock(props)}</>

}