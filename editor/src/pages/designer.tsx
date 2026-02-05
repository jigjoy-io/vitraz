import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Page from "../components/page"
import { modeUpdated, pageUpdated, pagesUpdated, rootPageUpdated } from "../reducers/page-reducer"
import { AppDispatch, useBlocked, useModified, usePage, useRootPage, useSidebarVisible } from "../util/store"
import { getPages, updatePage } from "../api/page"
import { replaceBlock } from "../util/traversals/replace-block"
import LeftSideMenu from "./designer/left-side-menu"
import { RightSideMenu } from "./designer/right-side-menu/right-side-menu"
import { blockingUpdated } from "../reducers/editor-reducer"

export default function Designer() {
	const blocked = useBlocked()
	const page = usePage()
	const rootPage = useRootPage()
	const modified = useModified()
	const dispatch = useDispatch<AppDispatch>()
	const sidebarVisible = useSidebarVisible()

	const update = (rootPage, page) => {
		if (rootPage === null || page === null || rootPage === undefined || page === undefined) return

		let root = JSON.parse(JSON.stringify(rootPage))
		let activePage = JSON.parse(JSON.stringify(page))

		root = replaceBlock(root, activePage)
		dispatch(rootPageUpdated(root))

		updatePage(root)
	}

	useEffect(() => {
		dispatch(blockingUpdated(false))
		dispatch(modeUpdated("editing"))
		getPages().then((pages) => {
			dispatch(pagesUpdated(pages))
			if (pages.length > 0 && !rootPage) {
				const first = pages[0]
				dispatch(rootPageUpdated(first))
				dispatch(pageUpdated(first))
			}
		})
	}, [])

	useEffect(() => {
		if (modified) update(rootPage, page)
	}, [modified])

	return (
		<div style={{ pointerEvents: blocked ? "none" : "auto" }} className="overflow-x-hidden">
			<div className="flex flex-row">
				<div className="w-[200px] min-w-[200px] max-w-[200px] lg:w-[230px] lg:min-w-[360px] lg:max-w-[360px] grow-0">
					<LeftSideMenu />
				</div>
				<div
					className={`bg-gray-100 flex flex-col p-20 ${sidebarVisible ? "grow" : "w-[100%]"} max-h-[100dvh] h-[100dvh] overflow-y-auto`}
				>
					<div className="grow">{page && <Page />}</div>
				</div>

				<div className={`grow-0 ${sidebarVisible ? "w-[50%]" : ""}`}>{sidebarVisible && <RightSideMenu />}</div>
			</div>
		</div>
	)
}
