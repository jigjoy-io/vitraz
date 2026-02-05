import React from "react"
import { useDispatch } from "react-redux"
import Button from "../../components/button/button"
import { usePages, useRootPage } from "../../util/store"
import Node from "./node"
import { useNavigate } from "@tanstack/react-router"
import { sidebarExpanded } from "../../reducers/sidebar-reducer"

import MagicIcon from "../../icons/magic-icon"
import SidePanel from "./right-side-menu/side-panel"

export default function LeftSideMenu() {
	const navigate = useNavigate()
	const pages = usePages()
	const page = useRootPage()

	const dispatch = useDispatch()

	const enterPreview = () => {
		navigate({ to: "/preview" })
	}

	return (
		<div className="h-[100dvh] max-h-[100dvh] bg-[#F2EEF0] bg-opacity-30 border-r border-light shadow-lg flex flex-col flex-none">
			<div className="grow overflow-y-auto mt-4">
				{pages.length > 0 && (
					<div className="flex flex-col">
						<div className="w-full">
							<div className="px-3 py-2 font-bold">Drafts</div>
							<div className="flex flex-col">
								{pages.map((page) => (
									<Node key={page.id} {...page} root={page} ident={0} />
								))}
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="w-full">
				<div className="px-3 py-2 font-bold">Options</div>

				<div
					className="flex flex-col pl-4 hover:cursor-pointer hover:bg-primary-light h-[30px] items-center"
					onClick={() => dispatch(sidebarExpanded({ expanded: true, component: SidePanel }))}
				>
					<div className="flex flex-row w-[100%] h-[100%]">
						<div className="pr-2 flex items-center">
							<MagicIcon />
						</div>
						<div className="flex items-center">Right Side Menu</div>
					</div>
				</div>
			</div>

			<div className="w-full relative h-[300px] min-h-[300px] pt-4">
				{page && (
					<div className="w-full py-2 absolute bottom-0">
						<div className="w-[100%] px-3 py-1 flex gap-x-2">
							<Button text="Preview" color="default" width="w-full" action={enterPreview} />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
