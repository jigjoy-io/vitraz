import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { pageUpdated } from '../../reducers/pageReducer'
import CloseIcon from "../../icons/CloseIcon"
import Button from "../button/Button"
import Progress from "../progress/Progress"
import Content from "../PageContent"
import { usePage, useRootPage } from "../../util/store"

export default function CarouselPage(props: any) {

    const [current, setCurrent] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [pages, setPages] = useState(props.pages)
    const [origin, setOrigin] = useState(props.origin)
    const page = usePage()
    const rootPage = useRootPage()
    const dispatch = useDispatch()

    const backToHome = async (page: any) => {
        dispatch(pageUpdated(rootPage))
    }

    const calculatePercentage = (pageNumber: number) => {
        let percentage = (pageNumber / (pages.length - 1)) * 100
        setPercentage(percentage)
    }

    useEffect(() => {
        calculatePercentage(current)
    }, [])

    useEffect(() => {
        setPages(props.pages)
    }, [props.pages])

    const nextPage = () => {
        calculatePercentage(1 + current)
        setCurrent(1 + current)
    }

    const previousPage = () => {
        calculatePercentage(current - 1)
        setCurrent(current - 1)
    }

    return <>
        {page && <div className="flex flex-col h-[100dvh] p-3">
            <div className="flex flex-row h-max mb-4">
                <Progress percentage={percentage} />
                <div className='w-max bg-primary-light border-2 border-primary p-1 rounded-md cursor-pointer' onClick={() => backToHome(origin)}>
                    <CloseIcon />
                </div>
            </div>
            <Content blocks={pages[current].buildingBlocks} key={pages[current].id} id={pages[current].id} />
            {
                (current != pages.length - 1) && <div className="flex flex-row mt-4 gap-3">
                    <Button text="Previous" action={previousPage} /> <Button text="Next" action={nextPage} />
                </div>
            }
            {
                (current == pages.length - 1) && <div className="flex flex-row mt-4 gap-3">
                    <Button text="Back to Home" action={() => backToHome(origin)} />
                </div>
            }

        </div>}
    </>
}
