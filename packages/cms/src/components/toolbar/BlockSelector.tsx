import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import TemplateFactory from "../../factories/TemplateFactory"
import { blockingUpdated, expandedToolbarUpdated } from "../../reducers/toolbarReducer"
import { focusBlock, insertBlock, updateBlock } from "../../reducers/pageReducer"
import Item from "../item/Item"
import ClickOutsideListener from "../popover/ClickOutsideListener"
import { useActiveBlock } from "../../util/store"
import { selectorOptions } from "../../util/selectorOptions"
import { createPortal } from 'react-dom'

export default function BlockSelector(props: any) {


    const [option, setOption] = useState("")
    const [options, setOptions] = useState(selectorOptions)
    const [allOptions, setAllOptions] = useState(selectorOptions)
    const [showMenu, setShowMenu] = useState(false)
    const [placeholder, setPlaceholder] = useState("Click or type to add element...")
    const activeBlock = useActiveBlock()
    const ref = useRef<HTMLInputElement>(null)
    const [rect, setRect] = useState<null | any>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        ref.current?.focus()
    }, [])

    useEffect(() => {
        if (activeBlock == props.id)
            ref.current?.focus()
    }, [activeBlock])

    const filterCommands = (option: any, value: any, index: number) => {

        option.commands = allOptions[index].commands
            .filter((command: any) =>
                command.label.toLowerCase()
                    .includes(value.slice(1).toLowerCase()))
        return option
    }

    useEffect(() => {
        if (ref.current)
            setRect(ref.current.getBoundingClientRect())
    }, [showMenu])

    const handleChange = (event: any) => {

        setOption(event.target.value)

        if (event.target.value.startsWith("/")) {
            dispatch(blockingUpdated(true))
            setShowMenu(true)

            let comm = JSON.parse(JSON.stringify(allOptions))
            let temp = comm.map((option: any, index: number) => filterCommands(option, event.target.value, index))

            let result = temp.filter((option) => option.commands.length > 0)

            setOptions(result)
        } else {
            setShowMenu(false)
        }



    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {

            let block = TemplateFactory.get('text')
            block.text = event.target.value.trim()
            dispatch(insertBlock({
                referenceBlock: props.id,
                block: block,
                position: 'above'
            }))

            setOption("")
            dispatch(expandedToolbarUpdated(null))
        }
    }

    const closeMenu = () => {
        dispatch(blockingUpdated(false))
        setShowMenu(false)
        dispatch(expandedToolbarUpdated(null))
    }

    const insert = (event, type: string) => {

        dispatch(focusBlock(null))
        let block = TemplateFactory.get(type)
        block.id = props.id
        dispatch(expandedToolbarUpdated(null))
        dispatch(updateBlock(block))
        dispatch(focusBlock(block.id))
        closeMenu()
    }

    const handleLoseFocus = () => {
        //setPlaceholder("")
        dispatch(focusBlock(null))
    }

    return <div>
        <input
            ref={ref}
            type="text"
            value={option}
            onFocus={() => setPlaceholder("Click or type to add element...")}
            className="w-[100%] h-[1.8rem] bg-primary-light rounded-md hover:bg-gray-300 flex items-center focus:outline-0 placeholder:text-[black] py-4 px-2 opacity-80"
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleLoseFocus}
        />
        <div ref={ref}>
            {
                createPortal(<ClickOutsideListener callback={closeMenu}>

                    {
                        showMenu &&


                        <div className="fixed w-[400px] min-w-[400px] max-h-[500px] h-auto overflow-y-auto bg-white shadow rounded-lg p-1 -translate-x-[100%]"
                            style={{ top: rect.top + rect.height, left: rect.x + rect.width }}>
                            {
                                options.map((option: any, index) => <div>
                                    <>
                                        {option.commands.map((command: any) => <div className="p-1">
                                            <Item icon={command.icon} text={command.label} tabFocus={true} action={(e: any) => insert(e, command.key)}><div className="mt-2 text-sm">{command.description}</div></Item>
                                        </div>)
                                        }
                                        {options.length != index + 1 && <hr />}
                                    </>
                                </div>)
                            }
                        </div>
                    }


                </ClickOutsideListener>, document.body)
            }
        </div>


    </div>
}
