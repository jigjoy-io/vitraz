import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { accessPage } from '../api/page'
import Page from '../components/page'
import {
	modeUpdated,
	pageUpdated,
	rootPageUpdated,
} from '../reducers/page-reducer'
import Loader from '../components/loader/loader'
import { PostError } from '../util/errors/post-error'
import LocalizedStrings from 'react-localization'


let localization = new LocalizedStrings({
    en: {
        loadingMessage: "The page is loading",
    },
    sr: {
        loadingMessage: "Stranice se učitava"
    }
})

localization.setLanguage('sr')

export const Route = createFileRoute('/$pageId' as never)({
	loader: async ({ params: { pageId } }) => {
		try {
			return await accessPage(pageId)
		} catch (error) {
			throw error
		}
	},
	errorComponent: PostError,
	pendingComponent: () => <Loader message={localization.loadingMessage} />,
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