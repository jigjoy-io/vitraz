import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { loadPage } from '../reducers/pageReducer'
import CloseIcon from "../icons/CloseIcon"
import Button from "./button/Button"
import Progress from "./progress/Progress"
import Content from "./Content"
import { getPage } from "../api/page"

function ChapterPage(props: any) {

    const [current, setCurrent] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [pages, setPages] = useState(props.pages)
    const [origin, setOrigin] = useState(props.origin)
    const [innerPage, setInnerPage] = useState(null as any)


    const loadPage = (page: any) => {
        props.loadPage(page)
    }

    useEffect(() => {

        (async function loadPage() {
            let page = await getPage(pages[current])
            setInnerPage(page)
        })()

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

    return <>{origin && <div className="flex flex-col h-[100%]">
        <div className="flex flex-row h-max mb-4 px-4 pt-4">
            <Progress percentage={percentage} />
            <div className='w-max bg-primary-light border-2 border-primary p-1 rounded-md cursor-pointer' onClick={() => loadPage(props.origin)}>
                <CloseIcon />
            </div>
        </div>
        {innerPage && <Content blocks={innerPage?.buildingBlocks} key={innerPage.id} />}
        {
            (current != pages.length - 1) && <div className="flex flex-row mt-4 gap-3 px-4 pb-4">
                <Button text="Previous" action={previousPage} /> <Button text="Next" action={nextPage} />
            </div>
        }
        {
            (current == pages.length - 1) && <div className="flex flex-row mt-4 gap-3 px-4 pb-4">
                <Button text="Back to Home" action={() => loadPage(props.origin)} />
            </div>
        }

    </div>}</>
}

const mapDispatchToProps = {
    loadPage
}

export default connect(null, mapDispatchToProps)(ChapterPage)