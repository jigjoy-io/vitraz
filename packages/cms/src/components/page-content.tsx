import React, { useEffect, useState } from "react"
import BuildingBlock from "../factories/building-block"
import { LazyMotion, m } from "framer-motion"
import { useLanguage, useMode } from "../util/store"
import TemplateFactory from "../factories/templates/template-factory"
import { appendBlock, focusBlock } from "../reducers/page-reducer"
import { useDispatch } from "react-redux"


const animation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.33
        }
    }
}

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
}

const loadFeatures = () => import("../util/animations").then(res => res.default)

export default function PageContent(props: any) {

    const mode: any = useMode()
    const lang: any = useLanguage()
    const id: any = props.id
    const dispatch = useDispatch()


    const [blocks, setBlocks] = useState(props.config.buildingBlocks)

    useEffect(() => {
        setBlocks(props.config.buildingBlocks)
    }, [props.config])

    const ativateSelector = () => {

        if (blocks.length != 0 && blocks[blocks.length - 1].type == "block-selector") {
            dispatch(focusBlock(blocks[blocks.length - 1].id))
        } else {
            let selector = TemplateFactory.createBlockSelector()

            dispatch(appendBlock({
                pageId: id,
                block: selector
            }))
        }

    }

    return <>{
        (blocks != null) && <div className="bg-[white] h-full rounded-lg flex flex-col break-words">
            <div>
                <LazyMotion features={loadFeatures}>
                    <m.div variants={animation} initial="hidden" animate="show" >
                        {
                            blocks.map((block: any) => (
                                <m.div key={block.id} variants={item}>
                                    <BuildingBlock {...block} mode={mode} />
                                </m.div>
                            ))
                        }
                    </m.div>
                </LazyMotion>
            </div>
            <div className="grow min-h-[150px]" onClick={ativateSelector}></div>
        </div>
    }</>
}