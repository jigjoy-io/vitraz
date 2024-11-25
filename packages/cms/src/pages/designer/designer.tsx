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
import { blockingUpdated } from "../../reducers/toolbar-reducer"
import { sidebarExpanded } from "../../reducers/sidebar-reducer"
import Premium from "./right-side-menu/components/premium"

export default function Designer() {
	const blocked = useBlocked()
	const page = usePage()
	const rootPage = useRootPage()
	const modified = useModified()
	const dispatch = useDispatch<AppDispatch>()
	const sidebarVisible = useSidebarVisible()

	const update = (rootPage, page) => {
		if (rootPage === null || page === null) return

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
						<div className="h-[40px] w-[100%]">
							<div
								className="bg-[#74EDDF] hover:opacity-80 flex justify-center items-center cursor-pointer rounded-[5px] w-fit p-[2px] px-3 m-3 font-bold border"
								onClick={() => dispatch(sidebarExpanded({ expanded: true, component: Premium }))}
							>
								Premium
							</div>
						</div>
						<div className="grow">{page && <Page />}</div>
					</div>

					<div className={`grow-0 ${sidebarVisible ? "w-[500px]" : ""}`}>{sidebarVisible && <RightSideMenu />}</div>
				</div>
			</div>
		</AuthLayer>
	)
}
