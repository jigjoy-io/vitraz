import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Page from "../../components/Page"
import { rootPageUpdated } from "../../reducers/pageReducer"
import { AppDispatch, useBlocked, useMode, usePage, useRootPage } from "../../util/store"

import { updatePage } from "../../api/page"
import { replaceBlock } from "../../util/traversals/replaceBlock"
import PageTree from "./PageTree"

export default function Designer() {

    const blocked = useBlocked()
    const page = usePage()
    const rootPage = useRootPage()
    const dispatch = useDispatch<AppDispatch>()


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

    return <div style={{ pointerEvents: blocked ? 'none' : 'auto', zIndex: 100 }}>
        <div className="flex flex-row">
            <PageTree />
            {page && <Page />}
        </div>
    </div>
}