import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import CarouselIcon from "../../icons/CarouselIcon"
import Button from "../button/Button"
import Checkbox from "../checkbox/Checkbox"
import Tabs from "../tabs/Tabs"
import ClickOutsideListener from "../popover/ClickOutsideListener"
import Tab from "../tabs/Tab"
import TemplateFactory from "../../factories/TemplateFactory"
import { updateBlock } from "../../reducers/pageReducer"
import { useDispatch } from "react-redux"
import { usePage } from "../../util/store"
import { blockingUpdated } from "../../reducers/toolbarReducer"
import { createPortal } from "react-dom"

export default function CarouselConfigurer(props: any) {


    const dispatch = useDispatch()

    const [display, setDisplay] = useState(true)
    const [accessType, setAccessType] = useState(props.accessType)
    const [description, setDescription] = useState(props.description)
    const [title, setHeadline] = useState(props.title)
    const activePage = usePage()

    const [top, setTop] = useState<number>()
    const [y, setY] = useState<number>()

    const ref = useRef<HTMLInputElement>(null)

    useLayoutEffect(() => {

        if (ref.current) {
            let contentRect = ref.current.getBoundingClientRect()

            if (contentRect.top + window.innerHeight / 2 > window.innerHeight) {
                setY(-100)
                setTop(contentRect.top)
            }
            else {
                setY(0)
                setTop(contentRect.top)
            }
        }


    }, [display])

    const openConfigurer = () => {
        setDisplay(true)
        dispatch(blockingUpdated(true))
    }

    /**
     * Creates a new page block and replace page configurer block with newly created page tile.
     * Dispatches an action to replace the existing block with the new block.
     * @returns None
     */
    const create = () => {

        dispatch(blockingUpdated(false))

        let page = TemplateFactory.get("blank")
        page.origin = activePage.id

        let selector = TemplateFactory.get("block-selector")
        page.config.buildingBlocks.push(selector)

        let block = TemplateFactory.get('page-tile')

        block.title = title
        block.description = description
        block.page = page
        block.id = props.id

        dispatch(updateBlock(block))

    }


    return <div>

        {display && createPortal(<ClickOutsideListener callback={() => { dispatch(blockingUpdated(false)); setDisplay(false) }}>
            <div className="fixed rounded-md bg-[white] rounded-lg rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] -translate-x-[25%] left-[50%] z-50"
                style={{
                    width: 460,
                    pointerEvents: 'auto',
                    top: top,
                    transform: `translate(-25%, ${y}%)`
                }}
            >

                <div className="p-[5%]">
                    <div>
                        <Tabs>
                            <Tab key="Carousel Settings">
                                <div className="w-[100%] mt-[1rem]">
                                    <div className="flex flex-row w-full">
                                        <label
                                            className="flex-none flex items-center w-[33%]"
                                            htmlFor="headline"
                                        >
                                            Title:
                                        </label>
                                        <input className="ml-4 p-1 rounded-lg border w-[100%]" value={title} onChange={(e: any) => setHeadline(e.target.value)} />
                                    </div>
                                </div>

                                <div className="w-[100%] mt-[1rem]">
                                    <div className="flex flex-row w-full">
                                        <label
                                            className="flex-none flex items-center w-[33%]"
                                            htmlFor="headline"
                                        >
                                            Description:
                                        </label>
                                        <input className="ml-4 p-1 rounded-lg border w-[100%]" value={description} onChange={(e: any) => setDescription(e.target.value)} />
                                    </div>
                                </div>

                            </Tab>

                            <Tab key="Access Type">
                                <div className="w-[100%]">
                                    <div className="opacity-40">Coming soon!</div>
                                    <div className="flex flex-row w-full mt-3 gap-3">
                                        <Checkbox disabled={true} selected={accessType == 'freebie'} onChange={() => setAccessType('freebie')}>Freebie</Checkbox>
                                        <Checkbox disabled={true} selected={accessType == 'lead magnet'} onChange={() => setAccessType('lead magnet')}>Lead magnet</Checkbox>
                                        <Checkbox disabled={true} selected={accessType == 'paid'} onChange={() => setAccessType('paid')}>Paid</Checkbox>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>

                        <div className="mt-[1rem]">
                            <Button text="Create" action={create} />
                        </div>
                    </div>

                </div>
            </div>
        </ClickOutsideListener>, document.body)
        }
        <div
            ref={ref}
            onClick={openConfigurer}
            className="w-[100%] h-[50px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-md flex items-center pl-5 hover:opacity-60"
        >
            <CarouselIcon />
            <div className="pl-2">Click to add a page</div>
        </div>
    </div>
}