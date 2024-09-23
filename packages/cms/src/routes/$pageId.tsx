import { createFileRoute, ErrorComponent, ErrorComponentProps } from '@tanstack/react-router'
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

export class NotFoundError extends Error { }

export const Route = createFileRoute('/$pageId')({

	loader: ({ params: { pageId } }) => accessPage(pageId),
	errorComponent: PostErrorComponent,
	component: PageOverview
})

function PostErrorComponent({ error }: ErrorComponentProps) {
	if (error instanceof NotFoundError) {
		return <PageNotFound message={error.message} />
	} else{
		return <ErrorComponent error={error} />
	}
		
}

function PageNotFound(props){
	return <div className='flex flex-col h-[100dvh] pt-[10%] items-center gap-10'><Logo /><Title position="center" text={props.message} /></div>
}

function PageOverview() {
	const page = Route.useLoaderData()
	const dispatch = useDispatch()

	async function fetchData() {
		//let page = await accessPage(pageId)
		dispatch(rootPageUpdated(page))
		dispatch(pageUpdated(page))
	}

	useEffect(() => {
		dispatch(modeUpdated('visiting'))
		fetchData()
	}, [])

	return <>{page && <Page />}</>
}
