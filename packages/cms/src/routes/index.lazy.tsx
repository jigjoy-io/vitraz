import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPage } from "../api/page"
import Page from "../components/Page"
import { pageUpdated } from "../reducers/pageReducer"
import { useMode, usePageId } from "../util/store"

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route : any = createLazyFileRoute('/')({
  component: Home,
})

export default function Home() {

    const pageId = usePageId()
    const mode = useMode()
    const dispatch = useDispatch()

    useEffect(() => {

        (async function loadPage() {
            dispatch(pageUpdated(await getPage(pageId)))
        })()

    }, [pageId])

    return (pageId && mode) && <Page />
}
