import React from "react"
import { useDispatch } from "react-redux"
import { pageExpanded, pageUpdated } from "../../reducers/page-reducer"
import PageIcon from "../../icons/page-icon"

export default function PageDisplay({ title = "Blank Page", page }: { title: string; page: any }) {
	const dispatch = useDispatch()

	const load = () => {
		dispatch(pageUpdated(page))
		dispatch(pageExpanded(page.id))
	}

	return (
		<div className="flex flex-row gap-2 rounded-sm p-1 hover:cursor-pointer" onClick={load}>
			<PageIcon /> {title}
		</div>
	)
}
