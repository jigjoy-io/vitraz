import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Page from "../components/Page"
import { fetchPage, modeUpdated, rootPageUpdated } from "../reducers/pageReducer"
import { AppDispatch, useBlocked, useMode, usePage, usePageId, useRootPage } from "../util/store"

import { createLazyFileRoute } from '@tanstack/react-router'
import { updatePage } from "../api/page"
import { replaceBlock } from "../util/traversals/replaceBlock"

export const Route: any = createLazyFileRoute("/editor")({
    component: Editor
})

export default function Editor() {

    const blocked = useBlocked()
    const pageId = usePageId()
    const mode = useMode()
    const page = usePage()
    const rootPage = useRootPage()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {

        (async () => {
            dispatch(modeUpdated("editing"))
            dispatch(fetchPage(pageId))
        })()

    }, [])


    const update = (rootPage, page) => {

        if (rootPage === null || page === null)
            return

        let root = JSON.parse(JSON.stringify(rootPage))
        let activePage = JSON.parse(JSON.stringify(page))

        root = replaceBlock(root, activePage)
        dispatch(rootPageUpdated(root))
        updatePage(root)
    }

    useEffect(() => {
        update(rootPage, page)
    }, [page])

    return <div style={{ pointerEvents: blocked ? 'none' : 'auto', zIndex: 100 }}>{(pageId && mode) && <Page />}</div>
}
