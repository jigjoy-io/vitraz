import React, { useEffect, useState } from "react"
import { PageFactory } from "../../factories/PageFactory"
import container from '../../util/container'
import Conversation from "../conversation/Conversation"

function Page(props: any) {

    const pageService = container.resolve('pageService')
    const [config, setConfig] = useState<null | any>(null)

    useEffect(() => {
        pageService.getPage(props.id).then((response: any) => {
            let config = response.data.body
            config.mode = props.mode
            setConfig(config)
        })
    }, [])


    return <>{
        <div className="max-w-[100vw] md:max-w-[400px] max-h-[100dvh] h-[100dvh] md:max-h-[725px] md:h-[725px]">
                {config != null && PageFactory.get(config)}
        </div>
    }
    </>
}


export default Page