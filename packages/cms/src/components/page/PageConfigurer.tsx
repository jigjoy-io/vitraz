import React, { useRef, useState } from "react"
import CarouselIcon from "../../icons/CarouselIcon"
import Button from "../button/Button"
import Checkbox from "../checkbox/Checkbox"
import Tabs from "../tabs/Tabs"
import ClickOutsideListener from "../popover/ClickOutsideListener"
import Tab from "../tabs/Tab"
import TemplateFactory from "../../factories/TemplateFactory"
import { replaceBlock } from "../../reducers/pageReducer"
import { useDispatch } from "react-redux"
import { createPage } from "../../api/page"
import { usePageId } from "../../util/store"

export default function CarouselConfigurer(props: any) {


    const dispatch = useDispatch()

    const [display, setDisplay] = useState(props.display)
    const [accessType, setAccessType] = useState(props.accessType)
    const [description, setDescription] = useState(props.description)
    const [title, setHeadline] = useState(props.title)
    const pageId = usePageId()

    const ref = useRef<HTMLInputElement>(null)


    const create = async () => {

        // create page
        let page = TemplateFactory.get("blank")
        page.origin = pageId

        createPage(page)

        // insert carousel block tile
        let block = TemplateFactory.get('page-tile')

        block.title = title
        block.description = description
        block.pageId = page.id

        dispatch(replaceBlock({
            referenceBlock: props.id,
            block: block
        }))


    }

    return <div>

        {display && <ClickOutsideListener callback={() => setDisplay(false)}><div
            className="absolute rounded-md bg-[white] rounded-lg rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] -translate-x-[50%] left-[50%]"
            style={{
                zIndex: 300,
                width: 460,
                pointerEvents: 'auto'
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
        </ClickOutsideListener>
        }
        <div
            ref={ref}
            onClick={() => setDisplay(true)}
            className="w-[100%] h-[50px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-md flex items-center pl-5 hover:opacity-60"
        >
            <CarouselIcon />
            <div className="pl-2">Click to add a carousel</div>
        </div>
    </div>
}