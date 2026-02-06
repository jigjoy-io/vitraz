import React, { memo, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createPage, removePage, updatePage } from "../api/page"
import Grid from "../components/grid/grid"
import Item from "../components/item/item"
import DeleteBlockIcon from "../icons/delete-block-icon"
import DuplicateIcon from "../icons/duplicate-icon"
import ExpandPage from "../icons/expand-page"
import MoreIcon from "../icons/more-icon"
import { pageCollapsed, pageExpanded, pagesUpdated, pageUpdated, rootPageUpdated } from "../reducers/page-reducer"
import { blockingUpdated } from "../reducers/editor-reducer"
import { useExpandedPages, useHovered, usePage, usePages, useSelected } from "../util/store"
import { deletePage } from "../util/traversals/delete-page"
import { duplicateBlock } from "../util/traversals/duplcate-block"
import { findParent } from "../util/traversals/find-parent"
import { replaceBlock } from "../util/traversals/replace-block"
import { createPortal } from "react-dom"
import ClickOutsideListener from "../util/click-outside-listener"
import { pushBlock } from "../util/traversals/push-block"
import AddBlockIcon from "../icons/add-block-icon"
import RenameIcon from "../icons/rename-icon"
import TemplateFactory from "../util/factories/templates/template-factory"
import { nodeHovered } from "../reducers/sidebar-reducer"
import { Button, Tooltip } from "@jigjoy-io/ui-library"

const Node = memo(function Node(props: any) {
	const activePage = usePage()
	const selected = useSelected()

	const [renameActive, setRenameActive] = useState(false)
	const [dropdownActive, setDropdownActive] = useState(false)
	const [deleteActive, setDeleteActive] = useState(false)
	const [addingActive, setAddingActive] = useState(false)

	const [ident, setIdent] = useState(props.ident + 12)

	const [renameValue, setRenameValue] = useState("")
	const [tileToAdd, setTileToAdd] = useState("page-tile")

	const ref = useRef<HTMLDivElement>(null)
	const portalRef = useRef(null)

	const [rect, setRect] = useState<null | any>(null)

	const pages = usePages()
	const expandedPages = useExpandedPages()
	const hovered = useHovered()

	const dispatch = useDispatch()

	const remove = async () => {
		closeDropdown()

		if (props.root.id == props.id) {
			removePage(props.id)
			let result = pages.filter((page: any) => page.id !== props.id)
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

	const duplicatePage = (event: any) => {
		closeDropdown()
		event.stopPropagation()

		if (props.root.id == props.id) {
			let page = pages.find((page: any) => page.id == props.id)
			let clone = duplicateBlock(page)
			let result = JSON.parse(JSON.stringify(pages))
			clone.linkedPageId = null
			result.push(clone)
			createPage(clone)
			dispatch(pagesUpdated(result))
			return
		}

		let parent = findParent(props.root, props)
		parent = JSON.parse(JSON.stringify(parent))

		if (parent.type == "blank") {
			let index = parent.config.buildingBlocks.findIndex((block: any) => block.page?.id == props.id)
			let clone = duplicateBlock(parent.config.buildingBlocks[index])
			parent.config.buildingBlocks.splice(index, 0, clone)
		}

		let root = JSON.parse(JSON.stringify(props.root))
		let newPage = replaceBlock(root, parent)

		updatePage(newPage)

		if (newPage.id == activePage.id) {
			dispatch(rootPageUpdated(newPage))
			dispatch(pageUpdated(newPage))
		}
		let result = JSON.parse(JSON.stringify(pages))
		let index = result.findIndex((page: any) => page.id == newPage.id)
		result.splice(index, 1, newPage)
		dispatch(pagesUpdated(result))
	}

	const openRenamePopup = (event: any) => {
		closeDropdown()

		setRenameValue(props.name)
		event.stopPropagation()
		dispatch(blockingUpdated(true))
		setRenameActive(true)
	}

	const openDeletePopup = (event: any) => {
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
		let index = result.findIndex((page: any) => page.id == newPage.id)
		result.splice(index, 1, newPage)
		dispatch(pagesUpdated(result))

		if (newPage?.id == activePage.id) {
			dispatch(rootPageUpdated(newPage))
			dispatch(pageUpdated(newPage))
		}
	}

	const expandDropdown = async (e: React.MouseEvent) => {
		if (ref.current) setRect(ref.current.getBoundingClientRect())

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

	const loadPage = async (e: React.MouseEvent, selectedPage: any) => {
		e.stopPropagation()

		dispatch(pageExpanded(props.id))
		dispatch(rootPageUpdated(props.root))

		if (props.root.id == selectedPage.id) {
			dispatch(pageUpdated(props.root))
			return
		}

		let parent = findParent(props.root, selectedPage)

		if (parent.type == "blank") {
			dispatch(pageUpdated(selectedPage))
		}
	}

	const addPage = (e: React.MouseEvent) => {
		e.stopPropagation()

		let parent = findParent(props.root, props)
		parent = JSON.parse(JSON.stringify(parent))

		if (ref.current) setRect(ref.current.getBoundingClientRect())

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

		let index = allPages.findIndex((page: any) => page.id == newRoot.id)
		allPages.splice(index, 1, newRoot)
		dispatch(pagesUpdated(allPages))
	}

	const handlePageToCreate = (e: any) => {
		setTileToAdd(e.target.value)
	}

	return (
		<div>
			<div
				key={props.id}
				onClick={(e: React.MouseEvent) => loadPage(e, props)}
				className={`w-[100%] h-[30px] p-1 
            ${selected == props.id ? " bg-primary-light " : ""}
            hover:bg-primary-light hover:bg-opacity-60 rounded-sm flex flex-row items-center`}
				onMouseEnter={() => dispatch(nodeHovered(props.id))}
				onPointerLeave={() => dispatch(nodeHovered(null))}
				style={{ paddingLeft: `${ident}px` }}
			>
				<ExpandPage id={props.id} type={props.type} expand={expandPage} hover={hovered === props.id} />

				<div className="ml-1 px-1 hover:cursor-pointer grow flex truncate text-ellipsis overflow-hidden">
					{props.name}
				</div>
				{hovered === props.id && (
					<>
						<div onClick={expandDropdown} ref={ref}>
							<Tooltip message="Delete, duplicate, and more...">
								<MoreIcon />
							</Tooltip>
						</div>

						<div onClick={addPage}>
							<Tooltip message="Add page inside">
								<AddBlockIcon />
							</Tooltip>
						</div>
					</>
				)}
			</div>

			<div className="flex flex-col">
				{expandedPages.includes(props.id) &&
					props.config.buildingBlocks &&
					props.config.buildingBlocks.map((block: any) => (
						<div key={block.id}>
							{block.type == "page-tile" && <Node {...block.page} ident={ident} root={props.root} />}
						</div>
					))}
				{expandedPages.includes(props.id) &&
					props.config.pages &&
					props.config.pages.map((page: any) => <Node key={page.id} {...page} ident={ident} root={props.root} />)}
			</div>

			{dropdownActive &&
				createPortal(
					<ClickOutsideListener callback={closeDropdown}>
						<div
							className={`fixed flex rounded-md p-1 shadow bg-[white]`}
							style={{ top: rect.top + rect.height, left: rect.x + rect.width - 20 }}
							ref={portalRef}
						>
							<Grid numberOfCols={1}>
								<Item text="Rename" icon={RenameIcon} action={(e: any) => openRenamePopup(e)} />
								<Item text="Duplicate" icon={DuplicateIcon} action={duplicatePage} />
								<div className="border-b border-default-light" />
								<Item text="Delete" icon={DeleteBlockIcon} action={(e: any) => openDeletePopup(e)} />
							</Grid>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}

			{deleteActive &&
				createPortal(
					<ClickOutsideListener callback={closeDelete}>
						<div
							className="fixed flex rounded-md p-3 shadow bg-white w-[250px]"
							style={{ top: rect.top + rect.height, left: rect.x + rect.width }}
						>
							<div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
								<p className="font-bold">Delete Page Permanently?</p>
								<div>Are you sure? This will permanently erase all content.</div>
								<div className="flex gap-2 mt-3 justify-end">
									<Button size="sm" color="white" onClick={remove}>
										Yes
									</Button>
									<Button size="sm" color="default" onClick={closeDelete}>
										No
									</Button>
								</div>
							</div>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}

			{addingActive &&
				createPortal(
					<ClickOutsideListener callback={closeAdding}>
						<div
							className="fixed flex rounded-md p-3 shadow bg-white w-[250px]"
							style={{ top: rect.top + rect.height, left: rect.x + rect.width }}
						>
							<div className="flex flex-col gap-2 w-full" onClick={(e) => e.stopPropagation()}>
								<p className="font-bold">Choose Page Type</p>
								<select
									name="pageType"
									id="pageType"
									className="p-2 rounded-md w-full focus:outline-0"
									onChange={handlePageToCreate}
									value={tileToAdd}
								>
									<option value="page-tile">Blank Page</option>
								</select>
								<div className="flex mt-3">
									<Button size="sm" color="white" onClick={createNewPage}>
										Create
									</Button>
								</div>
							</div>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}

			{renameActive &&
				createPortal(
					<ClickOutsideListener callback={closeRename}>
						<div
							className={`fixed flex rounded-md p-1 shadow bg-[white]`}
							style={{ top: rect.top + rect.height, left: rect.x + rect.width }}
						>
							<div className="flex flex-row gap-2">
								<input
									className="p-1 rounded-md border w-[100%]"
									value={renameValue}
									onChange={(event) => setRenameValue(event.target.value)}
									autoFocus
								/>
								<Button size="sm" color="white" onClick={renamePage}>
									Rename
								</Button>
							</div>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}
		</div>
	)
})

export default Node
