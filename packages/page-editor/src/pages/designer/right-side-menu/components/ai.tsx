import React, { lazy, Suspense, useState } from "react"
const Button = lazy(() => import("renderer/Button"))
import { getCurrentUser } from "aws-amplify/auth"
import { createPage, generatePage } from "../../../../api/page"
import { refinePage } from "../../../../util/traversals/refine-page"
import { usePages } from "../../../../util/store"
import { pagesUpdated } from "../../../../reducers/page-reducer"
import { useDispatch } from "react-redux"
import Loader from "../../../../components/loader/loader"

export default function AI() {
	const [chatMessage, setChatMessage] = useState("")
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const pages = usePages()
	const dispatch = useDispatch()

	const handleChange = (e) => {
		setChatMessage(e.target.value)
	}

	const submitRequest = async () => {
		if (!chatMessage) {
			setError(true)
			return
		}

		setLoading(true)

		const user = await getCurrentUser()
		const { username, signInDetails } = user
		const email = signInDetails?.loginId || username

		const params = {
			statement: chatMessage,
		}

		let newPage = await generatePage(params)

		newPage = refinePage(newPage)
		newPage.origin = email
		newPage.environment = "development"
		newPage.linkedPageId = null

		let allPages = JSON.parse(JSON.stringify(pages))
		allPages.push(newPage)
		dispatch(pagesUpdated(allPages))

		setLoading(false)
		createPage(newPage)
	}

	return (
		<div className="flex flex-col justify-center items-center gap-4 px-10">
			<div className="text-heading text-center">JigJoy AI</div>
			<div className="text-center">
				<p>Just type a prompt and JigJoy AI will create an engaging, bite-sized lesson.</p>
			</div>
			<div>
				<div className="flex flex-col max-w-[500px] w-[500px] gap-3 mt-20">
					<div className="flex flex-row gap-3">
						<div className="grow">
							<input
								type="text"
								value={chatMessage}
								className="w-full h-10 px-3 py-2 bg-white rounded-md shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] border border-light outline-none"
								placeholder="Write here what you want to learn today..."
								onChange={handleChange}
							/>
						</div>
						<div className="w-fit">
							<Suspense>
								<Button text="Generate App" action={submitRequest} />
							</Suspense>
						</div>
					</div>
					{error && (
						<div className="text-[red] text-center">The message field is required. Please enter your message.</div>
					)}
				</div>
			</div>
			{loading && (
				<div className="px-3">
					<div className="w-full h-fit">
						<Loader message="App generation in progress" />
					</div>
				</div>
			)}
		</div>
	)
}
