import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createPage, removePage, updatePage } from "../../api/page"
import Grid from "../../components/grid/Grid"
import Item from "../../components/item/Item"
import ToolbarButtonWrapper from "../../components/toolbar/ToolbarButtonWrapper"
import DeleteBlockIcon from "../../icons/DeleteBlockIcon"
import { DuplicateIcon } from "../../icons/DuplicateIcon"
import { ExpandPage } from "../../icons/ExpandPage"
import { MoreIcon } from "../../icons/MoreIcon"
import { RenameIcon } from "../../icons/RenameIcon"
import { carouselPageSwitched, pagesUpdated, pageUpdated, rootPageUpdated } from "../../reducers/pageReducer"
import { blockingUpdated } from "../../reducers/toolbarReducer"
import { pageCollapsed, pageExpanded } from "../../reducers/treeReducer"
import { useCurrentCarouselPage, useExpandedPages, usePage, usePages } from "../../util/store"
import { deletePage } from "../../util/traversals/deletePage"
import { duplicateBlock } from "../../util/traversals/duplcateBlock"
import { findParent } from "../../util/traversals/findParent"
import { replaceBlock } from "../../util/traversals/replaceBlock"
import { createPortal } from "react-dom"
import ClickOutsideListener from "../../components/popover/ClickOutsideListener"
import Button from "../../components/button/Button"
import { useSearch } from '@tanstack/react-router'

export function Node(props: any) {

    const activePage = usePage()
    const activeCarousel = useCurrentCarouselPage()
    const [hover, setHover] = useState(null)
    const [renameActive, setRenameActive] = useState(false)
    const [dropdownActive, setDropdownActive] = useState(false)
    const [ident, setIdent] = useState(props.ident + 12)
    const pages = usePages()
    const [selected, setSelected] = useState<string | null>()

    const [renameValue, setRenameValue] = useState('')
    const [deleteActive, setDeleteActive] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const [rect, setRect] = useState<null | any>(null)

    const expandedPages = useExpandedPages()

    const portalRef = useRef(null)

    const dispatch = useDispatch()

    const pageId = useSearch({
        from: '/dashboard',
        select: (search: any) => search.pageId,
    })

    const remove = async (event) => {
        closeDropdown()
        event.stopPropagation()

        if (props.root.id == props.id) {
            removePage(props.id)
            let result = pages.filter((page) => page.id !== props.id)
            if (result.length != 0) {
                dispatch(rootPageUpdated(result[0]))
                dispatch(pageUpdated(result[0]))
            } else {
                dispatch(rootPageUpdated(null))
                dispatch(pageUpdated(null))
            }
            dispatch(pagesUpdated(result))

            return
        }

        let root: Page = JSON.parse(JSON.stringify(props.root))
        let page = deletePage(root, props.id)

        updatePage(page)
        dispatch(rootPageUpdated(page))
        dispatch(pageUpdated(page))


    }

    const duplicatePage = (event) => {
        closeDropdown()
        event.stopPropagation()

        if (props.root.id == props.id) {
            let page = pages.find((page) => page.id == props.id)
            let clone = duplicateBlock(page)
            let result = JSON.parse(JSON.stringify(pages))
            result.push(clone)
            createPage(clone)
            dispatch(pagesUpdated(result))
            return
        }

        let parent: Page = findParent(props.root, props)
        parent = JSON.parse(JSON.stringify(parent))

        if (parent.type == "blank") {
            let index = parent.config.buildingBlocks.findIndex((block) => block.page?.id == props.id)
            let clone = duplicateBlock(parent.config.buildingBlocks[index])
            parent.config.buildingBlocks.splice(index, 0, clone)
        } else if (parent.type == "carousel") {
            let index = parent.config.pages.findIndex((page) => page.id == props.id)
            let clone = duplicateBlock(parent.config.pages[index])
            parent.config.pages.splice(index, 0, clone)
        }


        let root: Page = JSON.parse(JSON.stringify(props.root))
        let newPage: Page = replaceBlock(root, parent)


        updatePage(newPage)

        if (newPage.id == activePage.id) {
            dispatch(rootPageUpdated(newPage))
            dispatch(pageUpdated(newPage))
        }
        let result = JSON.parse(JSON.stringify(pages))
        let index = result.findIndex((page) => page.id == newPage.id)
        result.splice(index, 1, newPage)
        dispatch(pagesUpdated(result))

    }

    const openRenamePopup = (event) => {
        closeDropdown()

        setRenameValue(props.name)
        event.stopPropagation()
        dispatch(blockingUpdated(true))
        setRenameActive(true)
    }

    const openDeletePopup = (event) => {
        closeDropdown()

        event.stopPropagation()
        dispatch(blockingUpdated(true))
        setDeleteActive(true)
    }

    const renamePage = () => {

        closeRename()

        let pageToRename = JSON.parse(JSON.stringify(props))

        pageToRename.name = renameValue

        let parent: Page = findParent(pageToRename.root, pageToRename)
        parent = JSON.parse(JSON.stringify(parent))

        let newPage: Page | null = null
        if (parent != null) {
            let root = JSON.parse(JSON.stringify(pageToRename.root))
            newPage = replaceBlock(root, pageToRename)
        } else {
            newPage = pageToRename
        }

        updatePage(newPage)

        let result = JSON.parse(JSON.stringify(pages))
        let index = result.findIndex((page) => page.id == newPage?.id)
        result.splice(index, 1, newPage)
        dispatch(pagesUpdated(result))

        if (newPage?.id == activePage.id) {
            dispatch(rootPageUpdated(newPage))
            dispatch(pageUpdated(newPage))
        }

    }

    const expandDropdown = async (e: React.MouseEvent, id) => {

        if (ref.current)
            setRect(ref.current.getBoundingClientRect())

        e.stopPropagation()
        dispatch(blockingUpdated(true))
        setDropdownActive(true)

    }

    const closeDropdown = () => {
        dispatch(blockingUpdated(false))
        setDropdownActive(false)
    }

    const closeRename = () => {
        dispatch(blockingUpdated(false))
        setRenameActive(false)
    }

    const closeDelete = () => {
        setDeleteActive(false)
        dispatch(blockingUpdated(false))
    }

    const expandPage = () => {
        const expanded = expandedPages.includes(props.id)

        if (expanded) {
            dispatch(pageCollapsed(props.id))
        } else {
            dispatch(pageExpanded(props.id))
        }
    }

    useEffect(() => {

        if (pageId == props.id) {
            setSelected(pageId)
            dispatch(rootPageUpdated(props.root))
            dispatch(pageUpdated(props.root))
        }

    }, [])

    useEffect(() => {
        if (activePage)
            setSelected(activePage.id)
    }, [activePage])

    useEffect(() => {
        setSelected(activeCarousel)
    }, [activeCarousel])

    const loadPage = async (e: React.MouseEvent, selectedPage) => {
        e.stopPropagation()

        dispatch(pageExpanded(props.id))

        if (props.root.id == selectedPage.id) {
            dispatch(rootPageUpdated(props.root))
            dispatch(pageUpdated(props.root))
            return
        }

        let parent = findParent(props.root, selectedPage)

        if (parent.type == "blank") {
            dispatch(pageUpdated(selectedPage))
            if (selectedPage.type == 'carousel') {
                dispatch(carouselPageSwitched(selectedPage.config.pages[0].id))
            }
        } else if (parent.type == "carousel") {
            dispatch(pageUpdated(parent))
            if (selectedPage.type == 'blank') {
                dispatch(carouselPageSwitched(selectedPage.id))
            }

        }


    }

    return <div>
        <div key={props.id}
            onClick={(e: React.MouseEvent) => loadPage(e, props)}
            className={`w-[100%] h-[30px] p-1 
            ${(selected == props.id) ? ' bg-primary-light ' : ''}
            hover:bg-primary-light hover:bg-opacity-60 rounded-sm flex flex-row items-center`}
            onMouseEnter={() => setHover(props.id)}
            onMouseLeave={() => setHover(null)}
            style={{ paddingLeft: `${ident}px` }}
        >

            <ExpandPage id={props.id} type={props.type} expand={expandPage} hover={hover} />

            <div className="ml-1 px-1 hover:cursor-pointer grow flex">{props.name}</div>
            {
                (hover == props.id) && <>


                    <div onClick={(e) => expandDropdown(e, props.id)} ref={ref}>
                        <ToolbarButtonWrapper tooltip="Delete, duplicate, and more...">
                            <MoreIcon />
                        </ToolbarButtonWrapper>
                    </div>

                    {/* <ToolbarButtonWrapper tooltip="Add a page inside" tansformed={false}>
                        <AddBlockIcon />
                    </ToolbarButtonWrapper> */}
                </>
            }
        </div>

        <div className="flex flex-col">
            {(expandedPages.includes(props.id) && props.config.buildingBlocks) && props.config.buildingBlocks.map((block) => <div key={block.id}>
                {(block.type == 'page-tile' || block.type == 'carousel-tile') && <Node {...block.page} ident={ident} root={props.root} />}

            </div>)}
            {(expandedPages.includes(props.id) && props.config.pages) && props.config.pages.map((page) => <Node key={page.id} {...page} ident={ident} root={props.root} />)}
        </div>

        {
            (dropdownActive) && <>
                {createPortal(<ClickOutsideListener callback={closeDropdown}>

                    <div className={`fixed flex rounded-md p-1 shadow bg-[white]`}
                        style={{ top: rect.top + rect.height, left: rect.x + rect.width - 20 }} ref={portalRef}>
                        <Grid numberOfCols={1}>

                            <Item text="Rename" icon={RenameIcon} action={(e) => openRenamePopup(e)} />
                            <Item text="Duplicate" icon={DuplicateIcon} action={duplicatePage} />
                            <div className='border-b border-default-light' />
                            <Item text="Delete" icon={DeleteBlockIcon} action={(e) => openDeletePopup(e)} />
                        </Grid>
                    </div>
                </ClickOutsideListener>, document.body)}
            </>
        }

        {
            (deleteActive) && <>
                {createPortal(<ClickOutsideListener callback={closeDelete}>
                    <div
                        className="fixed flex rounded-md p-3 shadow bg-white w-[250px]"
                        style={{ top: rect.top + rect.height, left: rect.x + rect.width }}>
                        <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                            <p className="font-bold">Delete Page Permanently?</p>
                            <div> Are you sure? This will permanently erase all content.</div>
                            <div className="flex gap-2 mt-3">
                                <Button size="sm" color="white" text="Yes" action={remove} />
                                <Button size="sm" color="default" text="No" action={closeDelete} />
                            </div>
                        </div>
                    </div>
                </ClickOutsideListener>, document.body)}
            </>
        }

        {
            (renameActive) && <>
                {createPortal(<ClickOutsideListener callback={closeRename}>

                    <div className={`fixed flex rounded-md p-1 shadow bg-[white]`}
                        style={{ top: rect.top + rect.height, left: rect.x + rect.width }}>
                        <div className="flex flex-row gap-2">
                            <input className="p-1 rounded-md border w-[100%]" value={renameValue} onChange={(event) => setRenameValue(event.target.value)} autoFocus /><Button text="Rename" size="sm" action={renamePage} />
                        </div>

                    </div>
                </ClickOutsideListener>, document.body)}
            </>
        }

    </div>

}