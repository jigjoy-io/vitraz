import { createFileRoute, ErrorComponent, ErrorComponentProps, useRouter, Outlet } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { accessPage } from '../api/page'
import Page from '../components/Page'
import {
	modeUpdated,
	pageUpdated,
	rootPageUpdated,
} from '../reducers/pageReducer'
import Title from '../components/title/Title'
import { Logo } from '../icons/Logo'
import Loader from '../components/loader/Loader'

export class NotFoundError extends Error { }

export const Route = createFileRoute('/$pageId')({
	loader: async ({ params: { pageId } }) => {
		try {
			const page = await accessPage(pageId)
			return page
		} catch (error) {
			throw error
		}
	},
	errorComponent: PostErrorComponent,
	pendingComponent: Loader,
	component: PageOverview
})

function PostErrorComponent({ error }: ErrorComponentProps) {
	if (error instanceof NotFoundError) {
		return <PageNotFound message={error.message} />
	} else {
		return <ErrorComponent error={error} />
	}
}

function PageNotFound(props) {
	return (
		<div className='flex flex-col h-[100dvh] pt-[10%] items-center gap-10'>
			<Logo />
			<Title position="center" text={props.message} />
		</div>
	)
}

function PageOverview() {
	const page = Route.useLoaderData()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(rootPageUpdated(page))
		dispatch(pageUpdated(page))
		dispatch(modeUpdated("visiting"))
	}, [page, dispatch])

	return <Page />
}