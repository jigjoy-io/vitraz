import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Page from "../../components/page"
import { modeUpdated, rootPageUpdated } from "../../reducers/page-reducer"
import { AppDispatch, useBlocked, useModified, usePage, useRootPage, useSidebarVisible } from "../../util/store"
import { updatePage } from "../../api/page"
import { replaceBlock } from "../../util/traversals/replace-block"
import LeftSideMenu from "./left-side-menu"
import { RightSideMenu } from "./right-side-menu/right-side-menu"
import AuthLayer from "../authorization/auth-layer"
import { blockingUpdated } from "../../reducers/editor-reducer"

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
	}, [])

	useEffect(() => {
		if (modified) update(rootPage, page)
	}, [modified])

	return (
		<AuthLayer>
			<div style={{ pointerEvents: blocked ? "none" : "auto" }} className="overflow-x-hidden">
				<div className="flex flex-row">
					<div className="w-[200px] min-w-[200px] max-w-[200px] lg:w-[230px] lg:min-w-[230px] lg:max-w-[230px] grow-0">
						<LeftSideMenu />
					</div>
					<div
						className={`flex flex-col ${sidebarVisible ? "grow" : "w-[100%]"} max-h-[100dvh] h-[100dvh] overflow-y-auto`}
					>
						<div className="grow">{page && <Page page={page} />}</div>
					</div>

					<div className={`grow-0 ${sidebarVisible ? "w-[50%]" : ""}`}>{sidebarVisible && <RightSideMenu />}</div>
				</div>
			</div>
		</AuthLayer>
	)
}
