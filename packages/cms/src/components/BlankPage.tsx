import React from "react"
import { usePage } from "../util/store"
import Content from "./Content"


export default function BlankPage() {

    const page : any = usePage()

    return <>{ 
        (page.buildingBlocks) && <Content blocks={page.buildingBlocks} key={page.id} />}</>
}