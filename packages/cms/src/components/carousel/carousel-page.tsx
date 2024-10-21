import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { carouselPageSwitched, pageUpdated } from '../../reducers/page-reducer'
import CloseIcon from "../../icons/close-icon"
import Button from "../button/button"
import Progress from "../progress/progress"
import Content from "../page-content"
import { useCurrentCarouselPage, usePage, useRootPage } from "../../util/store"

export default function CarouselPage(props: any) {

    const [current, setCurrent] = useState(0)
    const activeCarousel = useCurrentCarouselPage()
    const [percentage, setPercentage] = useState(0)
    const [pages, setPages] = useState(props.config.pages)
    // const [origin, setOrigin] = useState(props.origin)
    const page = usePage()
    const rootPage = useRootPage()
    const dispatch = useDispatch()
    const { previous, next, home } = props.config.buttons

    const backToHome = async () => {
        dispatch(pageUpdated(rootPage))

        if(rootPage.type=='carousel'){
            dispatch(carouselPageSwitched(rootPage.config.pages[0].id))
        }
    }

    const calculatePercentage = (pageNumber: number) => {
        let percentage = (pageNumber / (pages.length - 1)) * 100
        setPercentage(percentage)
    }

    const refreshCarousel = () => {
        let current = pages.findIndex((p: any) => p.id == activeCarousel)
        if (current != -1) {
            setCurrent(current)
            calculatePercentage(current)
        }
    }

    useEffect(() => {
        refreshCarousel()
    }, [activeCarousel])

    useEffect(() => {
        setPages(props.config.pages)
    }, [props.config.pages])

    useEffect(() => {
        refreshCarousel()
    }, [pages])


    const nextPage = () => {
        let nextPage = pages[current + 1]
        dispatch(carouselPageSwitched(nextPage.id))
    }

    const previousPage = () => {
        let nextPage = pages[current - 1]
        dispatch(carouselPageSwitched(nextPage.id))
    }

    return <>
        {page && <div className="flex max-h-[100dvh] h-[100dvh] w-[100%] justify-center overflow-y-auto">

            <div className="flex flex-col w-[100%] max-w-[400px]">

                <div className="flex flex-row p-3">
                    <Progress percentage={percentage} />
                    <div className='w-max bg-primary-light border-2 border-primary p-1 rounded-md cursor-pointer' onClick={backToHome}>
                        <CloseIcon />
                    </div>
                </div>


                <div className="h-[100%] p-3">
                    <Content config={pages[current].config} key={pages[current].id} id={pages[current].id} />
                </div>


                {
                    (current != pages.length - 1) && <div className="flex flex-row fixed bottom-0 gap-3 p-3 mt-3 bg-white w-[100%] max-w-[400px]">
                        <Button  width="w-full" text={previous} action={previousPage} /> <Button  width="w-full" text={next} action={nextPage} />
                    </div>
                }
                {
                    (current == pages.length - 1) && <div className="flex flex-row fixed bottom-0 gap-3 p-3 mt-3 bg-white w-[100%] max-w-[400px]">

                        <Button  width="w-full" text={home} action={backToHome} />
                    </div >
                }
            </div>


        </div >
        }
    </>
}
