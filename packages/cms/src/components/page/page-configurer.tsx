import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import CarouselIcon from "../../icons/carousel-icon"
import Button from "../button/button"
import Checkbox from "../checkbox/checkbox"
import Tabs from "../tabs/tabs"
import ClickOutsideListener from "../../util/click-outside-listener"
import Tab from "../tabs/tab"
import { updateBlock } from "../../reducers/page-reducer"
import { useDispatch } from "react-redux"
import { useLanguage, usePage } from "../../util/store"
import { blockingUpdated } from "../../reducers/toolbar-reducer"
import { createPortal } from "react-dom"
import LocalizedStrings from "react-localization"
import TemplateFactory from "../../util/factories/templates/template-factory"

let localization = new LocalizedStrings({
    US: {
        create: "Create",
        title: "Title: ",
        description: "Description: ",
        clickToAdd: "Click to add a page",
        comingSoon: "Coming soon!",
        freebie: "Freebie",
        leadMagnet: "Lead magnet",
        paid: "Paid",
        carouselSettings: "Carousel Settings",
        accessType: 'Access Type'
    },
    RS: {
        create: "Kreiraj",
        title: "Naslov: ",
        description: "Opis: ",
        clickToAdd: "Klikni da dodaš stranicu",
        comingSoon: "Uskoro",
        freebie: "Besplatno",
        leadMagnet: "Lead magnet",
        paid: "Plaćeno",
        carouselSettings: "Podešavanje karusela",
        accessType: 'Podešavanje pristupa'
    }
})




export default function CarouselConfigurer(props: any) {


    const dispatch = useDispatch()

    const [display, setDisplay] = useState(props.display)
    const [accessType, setAccessType] = useState(props.accessType)
    const [description, setDescription] = useState(props.description)
    const [title, setHeadline] = useState(props.title)
    const activePage = usePage()
    const lang = useLanguage()

    const [top, setTop] = useState<number>()
    const [left, setLeft] = useState<number>()
    const [y, setY] = useState<number>()

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {

        localization.setLanguage(lang)
        
        window.onbeforeunload = function () {
            turnOffPopup()
            return true
        }

        return () => {
            window.onbeforeunload = null
        }

    }, [])

    useLayoutEffect(() => {

        if (ref.current) {
            let contentRect = ref.current.getBoundingClientRect()

            if (contentRect.top + window.innerHeight / 2 > window.innerHeight) {
                setY(-100)
            }
            else {
                setY(0)
            }

            setTop(contentRect.top)
			setLeft(contentRect.left + contentRect.width/2)
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

        let block = TemplateFactory.createPageTileBlock(activePage.id)
        block.title = title
        block.description = description

        // replace configurer with carousel block tile
        block.id = props.id

        dispatch(updateBlock(block))

    }

    const turnOffPopup = () => {
        let block = JSON.parse(JSON.stringify(props))
        block.display = false
        dispatch(updateBlock(block))
    }

    const onClose = () => {

        dispatch(blockingUpdated(false))
        setDisplay(false)
        turnOffPopup()

    }


    return <div>

        {display && createPortal(<ClickOutsideListener callback={onClose}>
            <div className="fixed rounded-md bg-[white] rounded-lg rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] z-50"
                style={{
                    width: 460,
                    pointerEvents: 'auto',
                    top: top,
                    left: left,
                    transform: `translate(-50%, ${y}%)`
                }}
            >

                <div className="p-[5%]">
                    <div>
                        <Tabs>
                            <Tab key={localization.carouselSettings}>
                                <div className="w-[100%] mt-[1rem]">
                                    <div className="flex flex-row w-full">
                                        <label
                                            className="flex-none flex items-center w-[33%]"
                                            htmlFor="headline"
                                        >
                                            {localization.title}
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
                                            {localization.description}
                                        </label>
                                        <input className="ml-4 p-1 rounded-lg border w-[100%]" value={description} onChange={(e: any) => setDescription(e.target.value)} />
                                    </div>
                                </div>

                            </Tab>

                            <Tab key={localization.accessType}>
                                <div className="w-[100%]">
                                    <div className="opacity-30">{localization.comingSoon}</div>
                                    <div className="flex flex-row w-full mt-3 gap-3">
                                        <Checkbox disabled={true} selected={accessType == 'freebie'} onChange={() => setAccessType('freebie')}>{localization.freebie}</Checkbox>
                                        <Checkbox disabled={true} selected={accessType == 'lead magnet'} onChange={() => setAccessType('lead magnet')}>{localization.leadMagnet}</Checkbox>
                                        <Checkbox disabled={true} selected={accessType == 'paid'} onChange={() => setAccessType('paid')}>{localization.paid}</Checkbox>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>

                        <div className="mt-[1rem]">
                            <Button  width="w-full" text={localization.create} action={create} />
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
            <div className="pl-2">{localization.clickToAdd}</div>
        </div>
    </div>
}