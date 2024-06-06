import React from "react"
import BuildingBlock from "../factories/BuildingBlock"
import { LazyMotion, m } from "framer-motion"
import { useMode } from "../util/store"


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

export default function Content(props: any) {

    const mode: any = useMode()
    const blocks: any = props.blocks

    return <>{
        (blocks) && <div className="bg-[white] rounded-lg h-[100%] overflow-y-auto overwflow-x-hidden p-4">
            <div className="bg-[white] rounded-lg h-[100%] overflow-y-auto overwflow-x-hidden p-4">
                <LazyMotion features={loadFeatures}>
                    <m.div variants={animation} initial="hidden" animate="show">
                        {
                            blocks.map((block: any) => (
                                <m.div className="mt-3" key={block.id} variants={item}>
                                    <BuildingBlock {...block} mode={mode} />
                                </m.div>
                            ))
                        }
                    </m.div>
                </LazyMotion>

            </div>
        </div>
    }</>
}