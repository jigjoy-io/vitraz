import React from "react"
import { usePage } from "../../util/store"
import Content from "../PageContent"


export default function BlankPage() {

    const page: any = usePage()

    return <>{(page.config) && <div className="flex max-h-[100dvh] h-[100dvh] w-[100%] justify-center overflow-y-auto">

        <div className="flex flex-col h-[100%] w-full max-w-[400px] p-3">

            <div className="h-[100%]">
                <Content config={page.config} key={page.id} id={page.id} />
            </div>
        </div>

    </div>}
    </>
}