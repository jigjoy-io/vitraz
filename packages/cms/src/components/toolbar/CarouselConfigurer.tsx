import React, { useRef, useState } from "react"
import CarouselIcon from "../../icons/CarouselIcon"
import Button from "../button/Button"
import Checkbox from "../checkbox/Checkbox"
import ClickOutsideListener from "../popover/ClickOutsideListener"

export default function CarouselConfigurer(props: any) {


    const [display, setDisplay] = useState(props.display)
    const [accessType, setAccessType] = useState(props.accessType)
    const [numberOfPages, setNumberOfPages] = useState(props.numberOfPages)
    const [description, setDescription] = useState(props.description)
    const [headline, setHeadline] = useState(props.headline)

    const ref = useRef<HTMLInputElement>(null)


    const create = () => {

        

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
                    <div className="font-bold flex-none flex items-center">
                        Carousel Settings
                    </div>

                    <div className="w-[100%] mt-[1rem]">
                        <div className="flex flex-row w-full">
                            <label
                                className="flex-none flex items-center w-[33%]"
                                htmlFor="headline"
                            >
                                Headline:
                            </label>
                            <input className="ml-4 p-1 rounded-lg border w-[100%]" value={headline} onChange={(e: any) => setHeadline(e.target.value) } />
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
                            <input className="ml-4 p-1 rounded-lg border w-[100%]" value={description} onChange={(e: any) => setDescription(e.target.value) } />
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
                            <input className="ml-4 p-1 rounded-lg border w-[100%]" type="number" min={1} value={numberOfPages} onChange={(e: any) => setNumberOfPages(e.target.value) } />
                        </div>
                    </div>

                    <div className="w-[100%] my-[2rem]">
                        <h3 className="font-bold flex-none flex items-center opacity-30">
                            Access Type (Comming Soon)
                        </h3>
                        <div className="flex flex-row w-full mt-3 gap-3">
                            <Checkbox disabled={true} selected={accessType == 'freebie'} onChange={() => setAccessType('freebie')}>Freebie</Checkbox>
                            <Checkbox disabled={true} selected={accessType == 'lead magnet'} onChange={() => setAccessType('lead magnet')}>Lead magnet</Checkbox>
                            <Checkbox disabled={true} selected={accessType == 'paid'} onChange={() => setAccessType('paid')}>Paid</Checkbox>
                        </div>
                    </div>
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