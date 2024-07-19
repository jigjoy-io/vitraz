import React from "react"
import { usePage } from "../util/store"
import { PageFactory } from "../factories/PageFactory"

function Page() {

    const page = usePage()

    return <>{
        <div className="max-h-[100dvh] h-[100dvh] md:min-w-[400px] md:max-w-[400px] w-[100dvw]">
                {page != null && PageFactory.get(page)}
        </div>
    }</>
}


export default Page