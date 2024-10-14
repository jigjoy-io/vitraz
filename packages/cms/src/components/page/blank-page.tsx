import React from "react"
import { usePage } from "../../util/store"
import Content from "../page-content"


export default function BlankPage() {

    const page: any = usePage()

    return <>{(page.config) && <div className="flex w-[100%] justify-center">

        <div className="flex flex-col w-full max-w-[400px] p-3">

            <div>
                <Content config={page.config} key={page.id} id={page.id} />
            </div>
        </div>

    </div>}
    </>
}