import { fetchUserAttributes, getCurrentUser } from "@aws-amplify/auth"
import { useNavigate } from "@tanstack/react-router"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useMode, usePages } from "../../util/store"
import {
	carouselPageSwitched,
	pageExpanded,
	pagesUpdated,
	pageUpdated,
	rootPageUpdated,
} from "../../reducers/page-reducer"
import { createPage } from "../../api/page"
import Loader from "../../components/loader/loader"
import CloseIcon from "../../icons/close-icon"
import Title from "../../components/title/title"
import Tile from "../../components/tile/tile"
import Heading from "../../components/heading/heading"
import TemplateFactory from "../../util/factories/templates/template-factory"

export default function Onboarding() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const mode = useMode()
	const pages = usePages()

	const checkUser = async () => {
		try {
			const user = await getCurrentUser()
			if (!user) {
				navigate({ to: "/" })
			}
		} catch (error) {
			navigate({ to: "/" })
			console.error("Error checking user authentication:", error)
		}
	}

	useEffect(() => {
		checkUser()
	}, [])

	const create = async (type) => {
		dispatch(carouselPageSwitched(null))

		// page creation
		const userAttributes = await fetchUserAttributes()
		let page = TemplateFactory.createPage(type, userAttributes.email)

		// state update
		let allPages = JSON.parse(JSON.stringify(pages))
		allPages.push(page)
		dispatch(pagesUpdated(allPages))

		createPage(page)

		dispatch(rootPageUpdated(page))
		dispatch(pageUpdated(page))

		dispatch(pageExpanded(page.id))

		navigate({
			to: `/interactive-content-designer`,
			search: {
				action: "page-creation",
			},
		})
	}

	return (
		<>
			{mode == "loading" ? (
				<Loader message="Project initialization in progress" />
			) : (
				<div>
					<div
						className="absolute top-10 right-10 w-max bg-primary-light border-2 border-primary p-1 rounded-[5px] cursor-pointer"
						onClick={() => navigate({ to: "/interactive-content-designer" })}
					>
						<CloseIcon />
					</div>
					<div className="flex flex-col mt-20 items-center justify-center">
						<Title position="center" text="Choose project to start."></Title>

						<div className="flex flex-row gap-8">
							<div
								className="w-[400px] cursor-pointer hover:bg-primary-light hover:rounded-[20px] mt-10"
								onClick={() => create("blank")}
							>
								<Tile>
									<Heading text="Blank Page" />
									<p className="mt-4">Create an app from scratch.</p>
								</Tile>
							</div>
							<div
								className="w-[400px] cursor-pointer hover:bg-primary-light hover:rounded-[20px] mt-10"
								onClick={() => create("carousel")}
							>
								<Tile>
									<Heading text="Carousel" />
									<p className="mt-4">Create a quiz or micro-lesson.</p>
								</Tile>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
