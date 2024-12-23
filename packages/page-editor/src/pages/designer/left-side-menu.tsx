import { getCurrentUser } from "aws-amplify/auth"
import React, { lazy, Suspense, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPages, publishPage, updatePage } from "../../api/page"
import Alert from "../../components/alert/alert"

const Button = lazy(() => import("renderer/Button"))
import { pagesUpdated, pageUpdated, rootPageUpdated } from "../../reducers/page-reducer"
import { usePages, useRootPage } from "../../util/store"
import Node from "./node"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { sidebarExpanded } from "../../reducers/sidebar-reducer"
import Loader from "../../components/loader/loader"
import HelpIcon from "../../icons/help-icon"
import AddBlockIcon from "../../icons/add-block-icon"
import Help from "./right-side-menu/components/help"
import UserMenu from "../authorization/user-menu/user-menu"
import Tutorial from "./right-side-menu/components/tutorial"
import BookIcon from "../../icons/book-icon."
import AI from "./right-side-menu/components/ai"
import MagicIcon from "../../icons/magic-icon"
import { v4 as uuidv4 } from "uuid"

export default function LeftSideMenu() {
	const navigate = useNavigate()
	const pages = usePages()
	const page = useRootPage()
	const [isLoading, setIsLoading] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)
	const [showError, setShowError] = useState(false)

	const dispatch = useDispatch()

	const { action } = useSearch({
		from: "/interactive-content-designer",
		select: (search: any) => {
			return {
				action: search.action,
			}
		},
	})

	async function fetchData() {
		const currentUser = await getCurrentUser()

		let fetchedPages = await getPages(currentUser.signInDetails?.loginId as string)

		if (!page) {
			dispatch(rootPageUpdated(fetchedPages[0]))
			dispatch(pageUpdated(fetchedPages[0]))
			dispatch(pagesUpdated(fetchedPages))
		} else {
			const fetchedPage = fetchedPages.find((fp) => fp.id == page.id)
			dispatch(rootPageUpdated(fetchedPage))
			dispatch(pageUpdated(fetchedPage))
			dispatch(pagesUpdated(fetchedPages))
		}
	}

	useEffect(() => {
		if (action != "page-creation") fetchData()
	}, [])

	const enterPreview = () => {
		navigate({ to: "/preview" })
	}

	const publish = async () => {
		setIsLoading(true)
		setShowSuccess(false)
		setShowError(false)
		try {
			let pageToPublish = JSON.parse(JSON.stringify(page))

			if (!pageToPublish.linkedPageId) {
				pageToPublish.linkedPageId = uuidv4()

				dispatch(rootPageUpdated(pageToPublish))
				dispatch(pageUpdated(pageToPublish))

				updatePage(pageToPublish)
			}

			await publishPage(pageToPublish)

			setShowSuccess(true)
			setIsLoading(false)
			setTimeout(() => {
				setShowSuccess(false)
				setShowError(false)
			}, 3000)
		} catch (error) {
			console.log(error)
			setShowError(true)
		}
	}

	const createNewPage = async () => {
		navigate({ to: "/onboarding" })
	}

	return (
		<div className="h-[100dvh] max-h-[100dvh] bg-[#F2EEF0] bg-opacity-30 border-r border-light shadow-lg flex flex-col flex-none">
			<UserMenu />
			<div
				className="mx-2 mt-5 px-3 py-2 flex flex-row items-center hover:bg-primary-light hover:bg-opacity-60 rounded-[5px] cursor-pointer border"
				onClick={createNewPage}
			>
				<AddBlockIcon />
				<div className="font-bold">Start New Project</div>
			</div>

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
					onClick={() => dispatch(sidebarExpanded({ expanded: true, component: AI }))}
				>
					<div className="flex flex-row w-[100%] h-[100%]">
						<div className="pr-2 flex items-center">
							<MagicIcon />
						</div>
						<div className="flex items-center">JigJoy AI</div>
					</div>
				</div>

				<div
					className="flex flex-col pl-4 hover:cursor-pointer hover:bg-primary-light h-[30px] items-center"
					onClick={() => dispatch(sidebarExpanded({ expanded: true, component: Tutorial }))}
				>
					<div className="flex flex-row w-[100%] h-[100%]">
						<div className="pr-2 flex items-center">
							<BookIcon />
						</div>
						<div className="flex items-center">Tutorial</div>
					</div>
				</div>

				<div
					className="flex flex-col pl-4 hover:cursor-pointer hover:bg-primary-light h-[30px] items-center"
					onClick={() => dispatch(sidebarExpanded({ expanded: true, component: Help }))}
				>
					<div className="flex flex-row w-[100%] h-[100%]">
						<div className="pr-2 flex items-center">
							<HelpIcon />
						</div>
						<div className="flex items-center">Help</div>
					</div>
				</div>
			</div>

			<div className="w-full relative h-[300px] min-h-[300px] pt-4">
				{page && (
					<div className="w-full py-2 absolute bottom-0">
						{isLoading && (
							<div className="px-3">
								<div className="w-full h-fit">
									<Loader message="Publishing page in progress" />
								</div>
							</div>
						)}
						{showSuccess && (
							<div className="px-3">
								<Alert
									type="success"
									title="Project published"
									message="Click `Share` to get a link with applied changes"
								/>
							</div>
						)}
						{showError && (
							<div className="px-3">
								<Alert
									type="danger"
									title="Something went wrong"
									message="The page was not published. Please try again later or contact JigJoy support."
								/>
							</div>
						)}
						<div className="w-[100%] px-3 py-1 flex gap-x-2">
							<div className="w-[50%]">
								<Suspense>
									<Button text="Preview" color="default" width="w-full" action={enterPreview} />
								</Suspense>
							</div>
							<Link
								to={`/${page.id}`}
								target="_blank"
								className="bg-primary-light hover:opacity-80 flex justify-center items-center cursor-pointer rounded-[5px] w-[50%] font-bold"
							>
								Share
							</Link>
						</div>
						<div className="w-[100%] px-3 py-1">
							<Suspense>
								<Button width="w-full" text="Publish" action={publish} />
							</Suspense>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
