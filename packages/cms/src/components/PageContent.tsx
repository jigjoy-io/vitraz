import React, { useEffect, useState } from "react"
import BuildingBlock from "../factories/BuildingBlock"
import { LazyMotion, m } from "framer-motion"
import { useMode } from "../util/store"
import TemplateFactory from "../factories/TemplateFactory"
import { appendBlock, focusBlock } from "../reducers/pageReducer"
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
    const id: any = props.id
    const dispatch = useDispatch()


    const [blocks, setBlocks] = useState(props.blocks)

    useEffect(() => {
        setBlocks(props.blocks)
    }, [props.blocks])

    const ativateSelector = () => {

        if (blocks.length != 0 && blocks[blocks.length - 1].type == "block-selector") {
            dispatch(focusBlock(blocks[blocks.length - 1].id))
        } else {
            let selector = TemplateFactory.get("block-selector")

            dispatch(appendBlock({
                pageId: id,
                block: selector
            }))
        }

    }

    return <>{
        (blocks != null) && <div className="bg-[white] rounded-lg h-[100%] flex flex-col p-4 overflow-y-auto">
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
            <div className="flex-1 min-h-[150px]" onClick={ativateSelector}>
            </div>
        </div>
    }</>
}