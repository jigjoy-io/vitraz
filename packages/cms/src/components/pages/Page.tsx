import React, { useEffect, useState } from "react"
import {PageFactory} from "../../factories/PageFactory"
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
        <>{config!=null && PageFactory.get(config)}</>
    }
    </>
}


export default Page