import { useExpandedPages } from "../util/store"
import ExpandDownIcon from "./expand-down-icon"
import PageIcon from "../building-blocks/page/page.icon"

export default function ExpandPage(props: any) {
	const expandedPages = useExpandedPages()

	const toggleExpand = (e: any) => {
		e.stopPropagation()
		props.expand()
	}

	return (
		<div
			onClick={(e) => toggleExpand(e)}
			className="flex items-center justify-center w-[24px] h-[24px] rounded-[5px] bg-[transparent] hover:bg-primary-light cursor-pointer"
		>
			{!props.hover && props.type == "blank" && <PageIcon />}
			{props.hover && (
				<div className={`${expandedPages.includes(props.id) ? "" : "-rotate-90"}`}>
					<ExpandDownIcon />
				</div>
			)}
		</div>
	)
}
