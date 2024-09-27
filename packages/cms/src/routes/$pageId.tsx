import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { accessPage } from '../api/page'
import Page from '../components/Page'
import {
	modeUpdated,
	pageUpdated,
	rootPageUpdated,
} from '../reducers/pageReducer'
import Loader from '../components/loader/Loader'
import { PostError } from '../util/errors/PostError'

export const Route = createFileRoute('/$pageId' as never)({
	loader: async ({ params: { pageId } }) => {
		try {
			return await accessPage(pageId)
		} catch (error) {
			throw error
		}
	},
	errorComponent: PostError,
	pendingComponent: () => <Loader message="The page is loading" />,
	component: PageDisplay
})

function PageDisplay() {
	const page = Route.useLoaderData()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(rootPageUpdated(page))
		dispatch(pageUpdated(page))
		dispatch(modeUpdated("visiting"))
	}, [page, dispatch])

	return <Page />
}