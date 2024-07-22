import React from "react"
import { usePage } from "../../util/store"
import Content from "../PageContent"


export default function BlankPage() {

    const page : any = usePage()

    return <>{(page.config) && <div className="min-h-[100dvh] max-h-[100dvh] h-[100dvh] w-[400px]"><Content config={page.config} key={page.id} id={page.id} /></div>}</>
}