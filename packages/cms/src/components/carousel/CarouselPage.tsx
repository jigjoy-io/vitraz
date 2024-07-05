import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { pageUpdated } from '../../reducers/pageReducer'
import CloseIcon from "../../icons/CloseIcon"
import Button from "../button/Button"
import Progress from "../progress/Progress"
import Content from "../PageContent"
import { usePage } from "../../util/store"
import { getPage } from "../../api/page"

export default function CarouselPage(props: any) {

    const [current, setCurrent] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [pages, setPages] = useState(props.pages)
    const [origin, setOrigin] = useState(props.origin)
    const page = usePage()
    const dispatch = useDispatch()

    const load = async (page: any) => {
        let result = await getPage(page)
        dispatch(pageUpdated(result))
    }

    useEffect(() => {
        let page = pages[current]
        dispatch(pageUpdated(page))
    }, [current])

    const calculatePercentage = (pageNumber: number) => {
        let percentage = (pageNumber / (pages.length - 1)) * 100
        setPercentage(percentage)
    }

    useEffect(() => {
        calculatePercentage(current)
    }, [])

    const nextPage = () => {
        calculatePercentage(1 + current)
        setCurrent(1 + current)
    }

    const previousPage = () => {
        calculatePercentage(current - 1)
        setCurrent(current - 1)
    }

    return <>
        {page && <div className="flex flex-col h-[100%]">
            <div className="flex flex-row h-max mb-4 pt-4">
                <Progress percentage={percentage} />
                <div className='w-max bg-primary-light border-2 border-primary p-1 rounded-md cursor-pointer' onClick={() => load(origin)}>
                    <CloseIcon />
                </div>
            </div>
            <Content blocks={page?.buildingBlocks} key={page.id} />
            {
                (current != pages.length - 1) && <div className="flex flex-row mt-4 gap-3 px-4 pb-4">
                    <Button text="Previous" action={previousPage} /> <Button text="Next" action={nextPage} />
                </div>
            }
            {
                (current == pages.length - 1) && <div className="flex flex-row mt-4 gap-3 px-4 pb-4">
                    <Button text="Back to Home" action={() => load(origin)} />
                </div>
            }

        </div>}
    </>
}
