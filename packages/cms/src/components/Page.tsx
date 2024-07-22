import React from "react"
import { usePage } from "../util/store"
import { PageFactory } from "../factories/PageFactory"

function Page() {

    const page = usePage()

    return <>{
            <div>
                {page != null && PageFactory.get(page)}
            </div>
    }</>
}


export default Page