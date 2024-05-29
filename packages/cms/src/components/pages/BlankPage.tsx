import React, { useEffect, useState } from "react"
import container from "../../util/container"
import BuildingBlock from "../../factories/BuildingBlock"

export default function BlankPage(props: any) {

    const pageService = container.resolve('pageService')
    const [config, setConfig] = useState<null | any>(null)

    useEffect(() => {
        pageService.getPage(props.id).then((response: any) => {
            let config = response.data.body
            config.mode = props.mode
            setConfig(config)
        })
    }, [])

    return <div className="bg-[white] rounded-lg h-[100%] overflow-y-auto overwflow-x-hidden p-4">
            {
                (config && config.type && config.buildingBlocks) && <>{config.buildingBlocks.map((block: any) => (
                    <div className="mt-3" key={block.id}>
                        <BuildingBlock {...block} mode={props.mode}/>
                    </div>
                ))}</>
            }
        </div>
}