import React from "react"
import { useExpandedPages } from "../util/store"
import CarouselIcon from "./CarouselIcon"
import { ExpandDownIcon } from "./ExpandDownIcon"
import { PageIcon } from "./PageIcon"

export function ExpandPage(props: any) {

    const expandedPages = useExpandedPages()

    const toggleExpand = (e) => {
        e.stopPropagation()
        props.expand()
        
    }

    return <div onClick={(e) => toggleExpand(e)} className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] bg-[transparent] hover:bg-primary-light border-2 border-[transparent] rounded-md cursor-pointer">
        {(!props.hover && props.type=='blank') && <PageIcon />}
        {(!props.hover && props.type=='carousel') && <CarouselIcon />}
        {props.hover && <div className={`${expandedPages.includes(props.id) ? '': '-rotate-90'}`}><ExpandDownIcon /></div>}
        
    </div>
}