import React, { useEffect } from "react"
import Page from "../components/Page"
import { fetchPage } from "../reducers/pageReducer"
import { AppDispatch, useMode, usePageId } from "../util/store"

import { createLazyFileRoute } from '@tanstack/react-router'
import { useDispatch } from "react-redux"

export const Route : any = createLazyFileRoute('/')({
  component: Home,
})

export default function Home() {

    const pageId = usePageId()
    const mode = useMode()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchPage(pageId))
    }, [pageId])

    return (pageId && mode) && <Page />
}
