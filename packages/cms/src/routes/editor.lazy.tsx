import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPage } from "../api/page"
import Page from "../components/Page"
import { modeUpdated, pageUpdated } from "../reducers/pageReducer"
import { useMode, usePageId } from "../util/store"

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route : any = createLazyFileRoute("/editor")({
  component: Editor
})

export default function Editor() {

    const pageId = usePageId()
    const mode = useMode()
    const dispatch = useDispatch()

    useEffect(() => {

        (async function loadPage() {
            dispatch(modeUpdated("editing"))
            dispatch(pageUpdated(await getPage(pageId)))
        })()

    }, [pageId])

    return (pageId && mode) && <Page />
}
