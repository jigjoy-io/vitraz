import React, { useState } from "react"
import { connect } from "react-redux"
import { loadPage } from "../../reducers/pageReducer"
import CloseIcon from "../../icons/CloseIcon"
import Button from "../button/Button"
import Page from "../pages/Page"
import Progress from "../progress/Progress"

function ChapterPage(props: any) {

    const [current, setCurrent] = useState(0)
    const [pages, setPages] = useState(props.pages)
    const [origin, setOrigin] = useState(props.origin)

    const loadPage = (page: any) => {
        props.loadPage(page)
    }

    const nextPage = () => {
        setCurrent(1 + current)
    }

    const previousPage = () => {
        setCurrent(current - 1)
    }

    return <div className="h-fit relative block min-w-[100vw] md:min-w-[400px] max-w-[100vw] md:max-w-[400px]">
        <div className="flex flex-row h-max mb-4">
            <Progress precentage={(current/(pages.length-1))*100}/>
            <div className='w-max bg-primary-light border-2 border-primary p-1 rounded-md cursor-pointer' onClick={() => loadPage({ pageId: origin, mode: props.mode })}>
                <CloseIcon />
            </div>
        </div>
        {(pages && pages.length > 0) && <Page mode={props.mode} id={pages[current]} key={pages[current]} />}
        {
            (current != pages.length - 1) && <div className="flex flex-row mt-4 gap-3">
                <Button text="Previous" action={previousPage}/> <Button text="Next" action={nextPage}/>
            </div>
        }
        {
            (current == pages.length - 1) && <div className="flex flex-row mt-4 gap-3">
                <Button text="Back to Home" action={() => loadPage({ pageId: origin, mode: props.mode })} />
            </div>
        }

    </div>
}

const mapDispatchToProps = {
    loadPage
}

export default connect(null, mapDispatchToProps)(ChapterPage)