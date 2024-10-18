import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createPage, removePage, updatePage } from "../../api/page"
import Grid from "../../components/grid/grid"
import Item from "../../components/item/item"
import DeleteBlockIcon from "../../icons/delete-block-icon"
import DuplicateIcon from "../../icons/duplicate-icon"
import ExpandPage from "../../icons/expand-page"
import MoreIcon from "../../icons/more-icon"
import { carouselPageSwitched, pagesUpdated, pageUpdated, rootPageUpdated } from "../../reducers/page-reducer"
import { blockingUpdated } from "../../reducers/toolbar-reducer"
import { pageCollapsed, pageExpanded } from "../../reducers/tree-reducer"
import { useCurrentCarouselPage, useExpandedPages, useLanguage, usePage, usePages } from "../../util/store"
import { deletePage } from "../../util/traversals/delete-page"
import { duplicateBlock } from "../../util/traversals/duplcate-block"
import { findParent } from "../../util/traversals/find-parent"
import { replaceBlock } from "../../util/traversals/replace-block"
import { createPortal } from "react-dom"
import ClickOutsideListener from "../../util/click-outside-listener"
import Button from "../../components/button/button"
import { useSearch } from '@tanstack/react-router'
import { pushBlock } from "../../util/traversals/push-block"
import LocalizedStrings from "react-localization"
import AddBlockIcon from "../../icons/add-block-icon"
import RenameIcon from "../../icons/rename-icon"
import { languageUpdated } from "../../reducers/localization-reducer"
import ToolbarButtonWrapper from "./toolbar/toolbar-button-wrapper"
import TemplateFactory from "../../util/factories/templates/template-factory"

let localization = new LocalizedStrings({
    US: {
        click: "Click",
        ctrlClick: "Ctrl-click",
        addBelow: "to add below",
        addAbove: "to add page above",
        addPageInside: "Add page inside",
        moreOptions: 'Delete, duplicate, and more...',
        rename: "Rename",
        duplicate: "Duplicate",
        delete: "Delete",
        choosePageType: 'Choose Page Type',
        blankPage: 'Blank Page',
        carousel: 'Carousel',
        create: 'Create',
        deletePage: 'Delete Page Permanently?',
        areYouSure: 'Are you sure? This will permanently erase all content.',
        yes: 'Yes',
        no: 'No'
    },
    RS: {
        click: "Klikni",
        ctrlClick: "Ctrl-klik",
        addBelow: "da dodaš stranicu dole",
        addAbove: "da dodaš stranicu gore",
        addPageInside: "Dodaj stranicu unutra",
        moreOptions: "Obriši, kloniraj, i drugo...",
        rename: "Preimenuj",
        duplicate: "Kloniraj",
        delete: "Obriši",
        choosePageType: 'Odaberite tip stranice',
        blankPage: 'Prazna stranica',
        carousel: 'Karusel',
        create: "Kreiraj",
        deletePage: 'Brisanje stranice',
        areYouSure: 'Da li si siguran? Čitav sadržaj unutar stranice biće obrisan.',
        yes: 'Da',
        no: 'Ne'
    }
})

export function Node(props: any) {

    const activePage = usePage()
    const activeCarousel = useCurrentCarouselPage()
    const [hover, setHover] = useState(null)

    const [renameActive, setRenameActive] = useState(false)
    const [dropdownActive, setDropdownActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState(false)
    const [addingActive, setAddingActive] = useState(false)

    const [ident, setIdent] = useState(props.ident + 12)

    const [selected, setSelected] = useState<string | null>()

    const [renameValue, setRenameValue] = useState('')
    const [tileToAdd, setTileToAdd] = useState('page-tile')

    const ref = useRef<HTMLDivElement>(null)
    const portalRef = useRef(null)

    const [rect, setRect] = useState<null | any>(null)

    const pages = usePages()
    const expandedPages = useExpandedPages()
    const lang = useLanguage()

    const dispatch = useDispatch()

    const pageId = useSearch({
        from: '/interactive-content-designer',
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

        let root = JSON.parse(JSON.stringify(props.root))
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

        let parent = findParent(props.root, props)
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


        let root = JSON.parse(JSON.stringify(props.root))
        let newPage = replaceBlock(root, parent)


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

        let parent = findParent(pageToRename.root, pageToRename)
        parent = JSON.parse(JSON.stringify(parent))

        let newPage: any = null
        if (parent != null) {
            let root = JSON.parse(JSON.stringify(pageToRename.root))
            newPage = replaceBlock(root, pageToRename)
        } else {
            newPage = pageToRename
        }

        updatePage(newPage)

        let result = JSON.parse(JSON.stringify(pages))
        let index = result.findIndex((page) => page.id == newPage.id)
        result.splice(index, 1, newPage)
        dispatch(pagesUpdated(result))

        if (newPage?.id == activePage.id) {
            dispatch(rootPageUpdated(newPage))
            dispatch(pageUpdated(newPage))
        }

    }

    const expandDropdown = async (e: React.MouseEvent) => {

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

    const closeAdding = () => {
        setAddingActive(false)
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
        if (activePage.type=='blank')
            setSelected(activePage.id)

        if (activePage.type=='carousel' && activeCarousel==null){
            dispatch(carouselPageSwitched(activePage.config.pages[0].id))

        }
    }, [activePage])

    useEffect(() => {
        setSelected(activeCarousel)
    }, [activeCarousel])


    useEffect(() => {
        localization.setLanguage(lang)
        dispatch(languageUpdated(lang))
    }, [lang])

    const loadPage = async (e: React.MouseEvent, selectedPage) => {
        e.stopPropagation()

        dispatch(pageExpanded(props.id))

        if (props.root.id == selectedPage.id) {
            dispatch(rootPageUpdated(props.root))
            dispatch(pageUpdated(props.root))
            if (selectedPage.type == 'carousel') {
                dispatch(carouselPageSwitched(selectedPage.config.pages[0].id))
            }
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

    const addTooltip = () => {


        let parent = findParent(props.root, props)

        if (parent && parent.type == 'carousel') {
            return <div className="text-center text-[14px]">
                <div>
                    <span className="font-extrabold">{localization.click}</span> {localization.addBelow}
                </div>
                <span className="font-extrabold">{localization.ctrlClick}</span> {localization.addAbove}
            </div>
        }

        return <div className="text-center text-[14px]">{localization.addPageInside}</div>

    }

    const addBlankPageToCarousel = (carousel, position) => {
        let blankPage = TemplateFactory.createBlankPage(props.id)

        carousel.config.pages.splice(position, 0, blankPage)

        let root = JSON.parse(JSON.stringify(props.root))
        let newRoot = replaceBlock(root, carousel)

        dispatch(rootPageUpdated(newRoot))
        updatePage(newRoot)

        let allPages = JSON.parse(JSON.stringify(pages))
        let index = allPages.findIndex((page) => page.id == newRoot.id)
        allPages.splice(index, 1, newRoot)
        dispatch(pagesUpdated(allPages))


        dispatch(pageUpdated(carousel))
        dispatch(carouselPageSwitched(blankPage.id))
    }

    const addPage = (e: React.MouseEvent) => {
        e.stopPropagation()

        let parent = findParent(props.root, props)
        parent = JSON.parse(JSON.stringify(parent))


        if (parent && parent.type == 'carousel') {
            let pageIndex = parent.config.pages.findIndex((p: any) => p.id == props.id)
            let position = e.ctrlKey ? pageIndex : pageIndex + 1
            addBlankPageToCarousel(parent, position)
            return
        }

        if (props.type == "carousel") {
            let carousel = JSON.parse(JSON.stringify(props))
            let position = carousel.config.pages.length

            addBlankPageToCarousel(carousel, position)

            return
        }

        if (ref.current)
            setRect(ref.current.getBoundingClientRect())

        dispatch(blockingUpdated(true))
        setAddingActive(true)


    }

    const createNewPage = () => {

        closeAdding()

        let block = TemplateFactory.createTile(tileToAdd, props.id)

        let page = JSON.parse(JSON.stringify(props))
        let root = JSON.parse(JSON.stringify(props.root))
        let allPages = JSON.parse(JSON.stringify(pages))

        let newPage = pushBlock(page, { block: block })
        newPage = JSON.parse(JSON.stringify(newPage))



        let newRoot = replaceBlock(root, newPage)
        dispatch(rootPageUpdated(newRoot))
        updatePage(newRoot)


        dispatch(rootPageUpdated(newPage))
        dispatch(pageUpdated(newPage))


        let index = allPages.findIndex((page) => page.id == newRoot.id)
        allPages.splice(index, 1, newRoot)
        dispatch(pagesUpdated(allPages))

    }

    const handlePageToCreate = (e) => {
        setTileToAdd(e.target.value)
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

            <div className="ml-1 px-1 hover:cursor-pointer grow flex truncate text-ellipsis overflow-hidden">{props.name}</div>
            {
                (hover == props.id) && <>


                    <div onClick={expandDropdown} ref={ref}>
                        <ToolbarButtonWrapper tooltip={<div className="text-center text-[14px]">{localization.moreOptions}</div>}>
                            <MoreIcon />
                        </ToolbarButtonWrapper>
                    </div>

                    <div onClick={addPage}>
                        <ToolbarButtonWrapper tooltip={addTooltip()} >
                            <AddBlockIcon />
                        </ToolbarButtonWrapper>
                    </div>

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
            dropdownActive && createPortal(<ClickOutsideListener callback={closeDropdown}>

                <div className={`fixed flex rounded-md p-1 shadow bg-[white]`}
                    style={{ top: rect.top + rect.height, left: rect.x + rect.width - 20 }} ref={portalRef}>
                    <Grid numberOfCols={1}>

                        <Item text={localization.rename} icon={RenameIcon} action={(e) => openRenamePopup(e)} />
                        <Item text={localization.duplicate} icon={DuplicateIcon} action={duplicatePage} />
                        <div className='border-b border-default-light' />
                        <Item text={localization.delete} icon={DeleteBlockIcon} action={(e) => openDeletePopup(e)} />
                    </Grid>
                </div>
            </ClickOutsideListener>, document.body)
        }

        {
            deleteActive && createPortal(<ClickOutsideListener callback={closeDelete}>
                <div
                    className="fixed flex rounded-md p-3 shadow bg-white w-[250px]"
                    style={{ top: rect.top + rect.height, left: rect.x + rect.width }}>
                    <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                        <p className="font-bold">{localization.deletePage}</p>
                        <div>{localization.areYouSure}</div>
                        <div className="flex gap-2 mt-3 justify-end">
                            <Button size="sm" color="white" text={localization.yes} action={remove} />
                            <Button size="sm" color="default" text={localization.no} action={closeDelete} />
                        </div>
                    </div>
                </div>
            </ClickOutsideListener>, document.body)
        }

        {
            addingActive && createPortal(<ClickOutsideListener callback={closeAdding}>
                <div
                    className="fixed flex rounded-md p-3 shadow bg-white w-[250px]"
                    style={{ top: rect.top + rect.height, left: rect.x + rect.width }}>
                    <div className="flex flex-col gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                        <p className="font-bold">{localization.choosePageType}</p>
                        <select name="pageType" id="pageType" className="p-2 rounded-md w-full focus:outline-0" onChange={handlePageToCreate} value={tileToAdd}>
                            <option value="page-tile">{localization.blankPage}</option>
                            <option value="carousel-tile">{localization.carousel}</option>
                        </select>
                        <div className="flex mt-3">
                            <Button size="sm" color="white" text={localization.create} action={createNewPage} />
                        </div>
                    </div>
                </div>
            </ClickOutsideListener>, document.body)
        }

        {
            renameActive && createPortal(<ClickOutsideListener callback={closeRename}>

                <div className={`fixed flex rounded-md p-1 shadow bg-[white]`}
                    style={{ top: rect.top + rect.height, left: rect.x + rect.width }}>
                    <div className="flex flex-row gap-2">
                        <input className="p-1 rounded-md border w-[100%]" value={renameValue} onChange={(event) => setRenameValue(event.target.value)} autoFocus /><Button text={localization.rename} size="sm" action={renamePage} />
                    </div>

                </div>
            </ClickOutsideListener>, document.body)

        }

    </div>

}