import React, { useEffect, useState } from "react"
import { PageFactory } from "../../factories/PageFactory"
import container from '../../util/container'

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
        <div className="min-w-[100dvw] md:min-w-[400px] md:max-w-[400px] max-h-[100dvh] h-[100dvh] md:h-[750px] md:min-h-[750px]">
                {config != null && PageFactory.get(config)}
        </div>
    }
    </>
}


export default Page