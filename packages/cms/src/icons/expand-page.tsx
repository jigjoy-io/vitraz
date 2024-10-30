import React from "react"
import { useExpandedPages } from "../util/store"
import CarouselIcon from "./carousel-icon"
import ExpandDownIcon from "./expand-down-icon"
import PageIcon from "./page-icon"

export default function ExpandPage(props: any) {
	const expandedPages = useExpandedPages()

	const toggleExpand = (e) => {
		e.stopPropagation()
		props.expand()
	}

	return (
		<div onClick={(e) => toggleExpand(e)} className="flex items-center justify-center w-[24px] h-[24px] rounded-[5px] bg-[transparent] hover:bg-primary-light border-2 border-[transparent] rounded-[5px] cursor-pointer">
			{!props.hover && props.type == "blank" && <PageIcon />}
			{!props.hover && props.type == "carousel" && <CarouselIcon />}
			{props.hover && (
				<div className={`${expandedPages.includes(props.id) ? "" : "-rotate-90"}`}>
					<ExpandDownIcon />
				</div>
			)}
		</div>
	)
}
