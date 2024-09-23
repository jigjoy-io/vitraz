import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
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
import { createPortal } from "react-dom"
import { blockingUpdated } from "../../reducers/toolbarReducer"

export default function CarouselConfigurer(props: any) {


    const dispatch = useDispatch()

    const [display, setDisplay] = useState(true)
    const [accessType, setAccessType] = useState(props.accessType)
    const [numberOfPages, setNumberOfPages] = useState(props.numberOfPages)
    const [description, setDescription] = useState(props.description)
    const [title, setHeadline] = useState(props.title)
    const activePage = usePage()

    const [top, setTop] = useState(window.innerHeight / 2)
    const [y, setY] = useState(0)

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
     * Creates a carousel block with multiple pages and replace carousel configurer block with newly created carousel tile.
     * @returns None
     */
    const create = () => {

        dispatch(blockingUpdated(false))

        let pages: any = []
        // create carousel inner pages
        for (let i = 0; i < numberOfPages; i++) {
            let page = TemplateFactory.get("blank")
            let selector = TemplateFactory.get("block-selector")

            page.config.buildingBlocks.push(selector)
            pages.push(page)
        }

        // create carousel page
        let page = TemplateFactory.get("carousel")
        page.origin = activePage.id
        page.config = {
            pages: pages
        }

        // replace configurer with carousel block tile
        let block = TemplateFactory.get('carousel-tile')

        block.title = title
        block.description = description
        block.page = page
        block.id = props.id

        dispatch(updateBlock(block))

    }



    return <div>

        {display && createPortal(<ClickOutsideListener callback={() => { dispatch(blockingUpdated(false)); setDisplay(false) }}>
            <div
                style={{
                    width: 460,
                    pointerEvents: 'auto',
                    top: top,
                    transform: `translate(-25%, ${y}%)`
                }}

                className="fixed rounded-md bg-[white] rounded-lg rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] z-50 -translate-x-[25%] left-[50%]"

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


                                <div className="w-[100%] mt-[1rem]">
                                    <div className="flex flex-row w-full">
                                        <label
                                            className="flex-none flex items-center w-[33%]"
                                            htmlFor="numberOfPages"
                                        >
                                            Number of pages:
                                        </label>
                                        <input className="ml-4 p-1 rounded-lg border w-[100%]" type="number" min={1} value={numberOfPages} onChange={(e: any) => setNumberOfPages(e.target.value)} />
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
            <div className="pl-2">Click to add a carousel</div>
        </div>
    </div>
}