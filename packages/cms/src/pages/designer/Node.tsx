import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { removePage, updatePage } from "../../api/page"
import Grid from "../../components/grid/Grid"
import Item from "../../components/item/Item"
import Popover from "../../components/popover/Popover"
import PopoverContent from "../../components/popover/PopoverContent"
import PopoverTrigger from "../../components/popover/PopoverTrigger"
import ToolbarButtonWrapper from "../../components/toolbar/ToolbarButtonWrapper"
import { AddBlockIcon } from "../../icons/AddBlockIcon"
import DeleteBlockIcon from "../../icons/DeleteBlockIcon"
import { DuplicateIcon } from "../../icons/DuplicateIcon"
import { ExpandPage } from "../../icons/ExpandPage"
import { MoreIcon } from "../../icons/MoreIcon"
import { RenameIcon } from "../../icons/RenameIcon"
import { carouselPageSwitched, pagesUpdated, pageUpdated, rootPageUpdated } from "../../reducers/pageReducer"
import { blockingUpdated, expandedToolbarUpdated } from "../../reducers/toolbarReducer"
import { pageCollapsed, pageExpanded } from "../../reducers/treeReducer"
import { useCurrentCarouselPage, useExpandedPages, useExpandedToolbar, usePage, usePages } from "../../util/store"
import { deletePage } from "../../util/traversals/deletePage"
import { findParent } from "../../util/traversals/findParent"

export function Node(props: any) {

    const activePage = usePage()
    const activeCarousel = useCurrentCarouselPage()
    const [hover, setHover] = useState(null)
    const [ident, setIdent] = useState(props.ident + 12)
    const pages = usePages()
    const [selected, setSelected] = useState(null)

    const expandedToolbar = useExpandedToolbar()
    const expandedPages = useExpandedPages()

    const dispatch = useDispatch()

    const remove = async () => {

        if (props.root.id == props.id) {
            removePage(props.id)
            let result = pages.filter((page) => page.id !== props.id)
            if (result.length > 0) {
                dispatch(rootPageUpdated(result[0]))
                dispatch(pageUpdated(result[0]))
            }
            dispatch(pagesUpdated(result))

            return
        }

        let page = deletePage(JSON.parse(JSON.stringify(props.root)), props.id)
        updatePage(page)
        dispatch(rootPageUpdated(page))
        dispatch(pageUpdated(page))



    }

    const duplicatePage = () => {

        if (props.root.id == props.id) {
            // create new page
            return
        }
    }

    const renamePage = () => {

    }

    const onClose = (e) => {
        dispatch(expandedToolbarUpdated(null))
        dispatch(blockingUpdated(false))
    }

    const expandToolbar = async (e: React.MouseEvent, id) => {

        dispatch(expandedToolbarUpdated(id))
        dispatch(blockingUpdated(true))

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
            hover:bg-primary-light hover:bg-opacity-60 rounded-sm flex flex-row items-center  
            ${expandedToolbar == props.id && 'bg-primary-light'}`}
            onMouseEnter={() => setHover(props.id)}
            onMouseLeave={() => setHover(null)}
            style={{ paddingLeft: `${ident}px` }}
        >

            <ExpandPage id={props.id} type={props.type} expand={expandPage} hover={hover} />

            <div className="ml-1 px-1 hover:cursor-pointer grow flex">Page</div>
            {
                (expandedToolbar == props.id || hover == props.id) && <>


                    <Popover onClose={onClose}>
                        <PopoverTrigger >
                            <div onClick={(e: React.MouseEvent) => expandToolbar(e, props.id)}>
                                <ToolbarButtonWrapper tooltip="Delete, duplicate, and more..." transformed={false}>
                                    <MoreIcon />
                                </ToolbarButtonWrapper>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent position="right">
                            <Grid numberOfCols={1}>
                                <Item text="Rename" icon={RenameIcon} action={renamePage} />
                                <Item text="Duplicate" icon={DuplicateIcon} action={duplicatePage} />
                                <div className='border-b border-default-light' />
                                <Item text="Delete" icon={DeleteBlockIcon} action={remove} />
                            </Grid>
                        </PopoverContent>
                    </Popover>
                    <ToolbarButtonWrapper tooltip="Add a page inside" tansformed={false}>
                        <AddBlockIcon />
                    </ToolbarButtonWrapper>
                </>
            }
        </div>

        <div className="flex flex-col">
            {(expandedPages.includes(props.id) && props.config.buildingBlocks) && props.config.buildingBlocks.map((block) => <div key={block.id}>
                {(block.type == 'page-tile' || block.type == 'carousel-tile') && <Node {...block.page} ident={ident} root={props.root} />}

            </div>)}
            {(expandedPages.includes(props.id) && props.config.pages) && props.config.pages.map((page) => <Node key={page.id} {...page} ident={ident} root={props.root} />)}
        </div>

    </div>

}