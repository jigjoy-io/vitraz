import React, { useEffect, useRef, useState } from "react"
import ToolbarButtonWrapper from "./toolbar-button-wrapper"
import { useDispatch } from "react-redux"
import { AddNewBlock } from "./builder/add-new-block"
import { createPortal } from "react-dom"
import { AnimatePresence, LazyMotion, m } from "framer-motion"
import { useSelectedBlocks } from "../../../util/store"
import { blockingUpdated } from "../../../reducers/editor-reducer"
import { insertBlock, removeBlock } from "../../../reducers/page-reducer"
import { duplicateBlock } from "../../../util/traversals/duplcate-block"
import ClickOutsideListener from "../../../util/click-outside-listener"
import DuplicateIcon from "../../../icons/duplicate-icon"
import OpenMenuIcon from "../../../icons/open-menu-icon"
import DeleteBlockIcon from "../../../icons/delete-block-icon"
import Grid from "../../../components/grid/grid"
import Item from "../../../components/item/item"
import { useDrag } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"

const animation = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
	exit: { opacity: 0 },
}

const transition = {
	ease: "easeIn",
	duration: 0.25,
}

const loadFeatures = () => import("../../../util/style-helper/animations").then((res) => res.default)

export default function Toolbar(props: any) {
	const [on, setOn] = useState(false)
	const [editor, setEditor] = useState<any>(null)
	const [toolbarVisible, setToolbarVisibility] = useState(false)
	const [blockRadius] = useState(props.blockRadius ?? "rounded-[5px]")

	const containerRef = useRef<HTMLDivElement | null>(null)
	const openMenuRef = useRef<HTMLDivElement>(null)
	const toolbarRef = useRef<HTMLDivElement>(null)
	const editorRef = useRef<HTMLDivElement>(null)
	const editorRefs = useRef<HTMLDivElement[]>([])

	const [toolbarTop, setToolbarTop] = useState<number>()
	const [toolbarLeft, setToolbarLeft] = useState<number>()
	const [editorTop, setEditorTop] = useState<number>()
	const [editorLeft, setEditorLeft] = useState<number>()

	const dispatch = useDispatch()
	const selectedBlocks = useSelectedBlocks()

	const [{ isDragging }, drag, dragPreview] = useDrag<any, void, { isDragging: boolean }>(
		() => ({
			type: "BLOCK",
			item: {
				type: "BLOCK",
				index: props.index,
				block: props.block,
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			preview: {
				captureDraggingState: true,
			},
		}),

		[props.index, props.block],
	)

	useEffect(() => {
		if (containerRef.current && !selectedBlocks) {
			dragPreview(containerRef.current)
		}
	}, [dragPreview])

	useEffect(() => {
		dragPreview(getEmptyImage(), { captureDraggingState: true })
	}, [])

	const handleMouseMove = (e: MouseEvent) => {
		if (containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect()
			const isWithinRange =
				e.clientX >= rect.left - 200 && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
			setOn(isWithinRange)
		}
	}

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [])

	const handleToolbarOpen = () => {
		setToolbarVisibility(true)
		if (openMenuRef.current) {
			const rect = openMenuRef.current.getBoundingClientRect()
			setToolbarLeft(rect.left)
			setToolbarTop(rect.top)
		}
		dispatch(blockingUpdated(true))
	}

	const handleToolbarClose = () => {
		if (editor == null) {
			setToolbarVisibility(false)
			dispatch(blockingUpdated(false))
		}
	}

	const deleteBlock = () => {
		handleToolbarClose()
		dispatch(removeBlock(props.id))
	}

	const duplicate = () => {
		handleToolbarClose()
		let block = duplicateBlock(props.block)
		dispatch(
			insertBlock({
				referenceBlock: props.block.id,
				block: block,
			}),
		)
	}

	const handleEditorClose = () => {
		setEditor(null)
		dispatch(blockingUpdated(false))
	}

	const handleOpenEditor = (option: any, index: number) => {
		dispatch(blockingUpdated(true))
		setEditor(option)
		if (editorRefs.current[index]) {
			const rect = editorRefs.current[index].getBoundingClientRect()
			setEditorLeft(rect.left + rect.width)
			setEditorTop(rect.top)
		}
	}

	const repositionEditor = () => {
		if (editorRef.current) {
			let e = editorRef.current.getBoundingClientRect()
			if (e.top + e.height > window.innerHeight - 16) {
				setEditorTop(window.innerHeight - e.height - 16)
			}
		}
	}

	const repositionToolbar = () => {
		if (toolbarRef.current) {
			let toolbar = toolbarRef.current.getBoundingClientRect()
			if (toolbar.top + toolbar.height > window.innerHeight - 16) {
				setToolbarTop(window.innerHeight - toolbar.height - 16)
			}
		}
	}

	useEffect(() => {
		setTimeout(() => {
			repositionToolbar()
			repositionEditor()
		}, 5)
	})

	return (
		<div
			ref={containerRef}
			onMouseEnter={() => setOn(true)}
			onMouseLeave={() => setOn(false)}
			className={`
            sticky flex flex-col
            ${isDragging ? "opacity-50 bg-gray-100 rounded-lg" : ""}
        `}
		>
			<LazyMotion features={loadFeatures}>
				<AnimatePresence>
					{(on || toolbarVisible || editor) && (
						<m.div variants={animation} initial="hidden" animate="show" exit="exit" transition={transition}>
							<div className="absolute -translate-x-[100%] px-2">
								<div className="flex flex-row">
									<AddNewBlock id={props.id} />
									<div onClick={handleToolbarOpen} ref={openMenuRef}>
										<ToolbarButtonWrapper
											tooltip={
												<div className="text-center text-[14px]">
													<div>
														<span className="font-extrabold">Open</span> menu
													</div>
													<span className="font-extrabold">Drag</span> to move
												</div>
											}
										>
											<div
												ref={drag}
												className="cursor-grab active:cursor-grabbing"
												style={{ opacity: isDragging ? 0.4 : 1 }}
											>
												<OpenMenuIcon />
											</div>
										</ToolbarButtonWrapper>
									</div>
								</div>
							</div>
						</m.div>
					)}
				</AnimatePresence>
			</LazyMotion>

			<div>
				<div
					className={`opacity-50 bg-highlight h-[100%] w-[100%] 
                    ${editor != null || toolbarVisible ? "absolute" : "hidden"} ${blockRadius}`}
				/>
				<div className={`${on && !toolbarVisible && editor == null && "opacity-80"} ${blockRadius}`}>
					{props.children}
				</div>
			</div>

			{toolbarVisible &&
				createPortal(
					<ClickOutsideListener callback={handleToolbarClose}>
						<div
							className="fixed flex rounded-[5px] p-1 shadow bg-[white] z-50 -translate-x-[100%]"
							style={{ top: toolbarTop, left: toolbarLeft }}
							ref={toolbarRef}
						>
							<Grid numberOfCols={1}>
								<Item text="Duplicate block" tabFocus={false} icon={DuplicateIcon} action={duplicate} />
								<Item
									text="Delete block"
									tabFocus={false}
									textColor="red"
									icon={DeleteBlockIcon}
									action={deleteBlock}
								/>
								{props.editingOptions.map((option: any, index: number) => (
									<div
										key={index}
										ref={(el: HTMLDivElement) => {
											editorRefs.current[index] = el
										}}
									>
										{index === 0 && <div className="border-b border-default-light" />}
										<Item
											text={option.name}
											tabFocus={false}
											icon={option.icon}
											action={() => handleOpenEditor(option, index)}
										/>
									</div>
								))}
							</Grid>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}

			{toolbarVisible &&
				editor &&
				createPortal(
					<ClickOutsideListener callback={handleEditorClose}>
						<div
							className="fixed flex rounded-[5px] p-1 shadow bg-[white] z-50"
							style={{ top: editorTop, left: editorLeft }}
							ref={editorRef}
						>
							<editor.editor
								id={props.id}
								tabFocus={false}
								block={props.block}
								attribute={editor.key}
								value={props.block[editor.key]}
								extraProps={editor.extraProps}
							/>
						</div>
					</ClickOutsideListener>,
					document.body,
				)}
		</div>
	)
}
