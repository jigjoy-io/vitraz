import React, { useLayoutEffect, useRef, useState } from 'react'

import ToolbarButtonWrapper from './ToolbarButtonWrapper'
import Item from '../item/Item'
import Grid from '../grid/Grid'
import OpenMenuIcon from '../../icons/OpenMenuIcon'
import { useDispatch } from 'react-redux'
import { blockingUpdated } from '../../reducers/toolbarReducer'
import { AddNewBlock } from './builder/AddNewBlock'
import { DuplicateIcon } from '../../icons/DuplicateIcon'
import DeleteBlockIcon from '../../icons/DeleteBlockIcon'
import { insertBlock, removeBlock } from '../../reducers/pageReducer'
import { duplicateBlock } from '../../util/traversals/duplcateBlock'
import { createPortal } from 'react-dom'
import ClickOutsideListener from '../popover/ClickOutsideListener'
import { AnimatePresence, LazyMotion, m } from 'framer-motion'

const animation = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}

const transition = {
    ease: "easeIn",
    duration: 0.25,
}

const loadFeatures = () => import("../../util/animations").then(res => res.default)

export default function Toolbar(props: any) {

    const [on, setOn] = useState(false)
    const [editor, setEditor] = useState<any>(null)
    const [toolbarVisible, setToolbarVisibility] = useState(false)
    const [blockRadius, setBlockRadius] = useState(props.blockRadius ? props.blockRadius : "rounded-lg")


    const openMenuRef = useRef<HTMLDivElement>(null)
    const toolbarRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<HTMLDivElement>(null)
    const editorRefs = useRef<HTMLDivElement[]>([])

    const [toolbarTop, setToolbarTop] = useState<number>()
    const [toolbarLeft, setToolbarLeft] = useState<number>()

    const [editorTop, setEditorTop] = useState<number>()
    const [editorLeft, setEditorLeft] = useState<number>()

    const dispatch = useDispatch()

    const turnOnToolbar = (e: any) => {
        setOn(true)
    }

    const turnOffToolbar = () => {
        setOn(false)
    }

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

        dispatch(insertBlock({
            referenceBlock: props.block.id,
            block: block
        }))
    }

    const handleEditorClose = () => {
        setEditor(null)
        dispatch(blockingUpdated(false))
    }

    const handleOpenEditor = (option, index) => {
        dispatch(blockingUpdated(true))
        setEditor(option)
        if (editorRefs.current[index]) {
            const rect = editorRefs.current[index].getBoundingClientRect()
            setEditorLeft(rect.left + rect.width)
            setEditorTop(rect.top)
        }

    }

    useLayoutEffect(() => {

        if (editorRef.current) {
            let editor = editorRef.current.getBoundingClientRect()

            if (editor.top + editor.height > window.innerHeight - 16) {
                setEditorTop(window.innerHeight - editor.height - 16)
            }
        }


    }, [editor])

    useLayoutEffect(() => {

        if (toolbarRef.current) {
            let toolbar = toolbarRef.current.getBoundingClientRect()

            if (toolbar.top + toolbar.height > window.innerHeight - 16) {
                setToolbarTop(window.innerHeight - toolbar.height - 16)
            }
        }


    }, [toolbarVisible])

    return (<>
        <div onMouseEnter={turnOnToolbar} onMouseLeave={turnOffToolbar} className="sticky flex flex-col">
            <LazyMotion features={loadFeatures}>
                <AnimatePresence>
                    {(on || toolbarVisible || editor) &&
                        <m.div variants={animation} initial="hidden" animate="show" exit="exit" transition={transition}>
                            <div className="absolute -translate-x-[100%] px-2">
                                <div className='flex flex-row'>
                                    <AddNewBlock id={props.id} />
                                    <div onClick={handleToolbarOpen} ref={openMenuRef}>
                                        <ToolbarButtonWrapper tooltip={<div className='text-center text-[14px]'>Open menu</div>}>
                                            <OpenMenuIcon />
                                        </ToolbarButtonWrapper>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    }
                </AnimatePresence>
            </LazyMotion>
            <div>
                <div className={`opacity-50 bg-default-light h-[100%] w-[100%] ${(editor != null || toolbarVisible) ? 'absolute' : 'hidden'} ${blockRadius}`}></div>
                <div className={`${(on && !toolbarVisible && editor == null) && 'opacity-80'} ${blockRadius}`}>
                    {props.children}
                </div>
            </div>


            {
                toolbarVisible && createPortal(<ClickOutsideListener callback={handleToolbarClose}>
                    <div className={`fixed flex rounded-md p-1 shadow bg-[white] z-50 -translate-x-[100%]`} style={{ top: toolbarTop, left: toolbarLeft }} ref={toolbarRef}>
                        <Grid numberOfCols={1}>
                            <Item text="Duplicate block" tabFocus={false} icon={DuplicateIcon} action={duplicate} />
                            <Item text="Delete block" tabFocus={false} textColor="red" icon={DeleteBlockIcon} action={deleteBlock} />
                            {
                                props.editingOptions.map((option: any, index) => <div ref={(el: HTMLDivElement) => { editorRefs.current[index] = el }}>
                                    {index == 0 && <div className='border-b border-default-light' />}
                                    <Item text={option.name} tabFocus={false} icon={option.icon} action={() => handleOpenEditor(option, index)} />
                                </div>
                                )
                            }
                        </Grid>
                    </div>

                </ClickOutsideListener>, document.body)
            }


            {toolbarVisible && editor &&

                createPortal(<ClickOutsideListener callback={handleEditorClose} >
                    <div className={`fixed flex rounded-md p-1 shadow bg-[white] z-50`} style={{ top: editorTop, left: editorLeft }} ref={editorRef}>
                        <editor.editor id={props.id} tabFocus={false} block={props.block} attribute={editor.key} value={props.block[editor.key]} />
                    </div>
                </ClickOutsideListener>, document.body)
            }

        </div>

    </>

    )

}

