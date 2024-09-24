import { fetchUserAttributes } from "aws-amplify/auth"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPages, publishPage } from "../../api/page"
import Alert from "../../components/alert/Alert"
import Button from "../../components/button/Button"
import Progress from "../../components/progress/Progress"
import { AddBlockIcon } from "../../icons/AddBlockIcon"
import { modeUpdated, pagesUpdated, pageUpdated, rootPageUpdated } from "../../reducers/pageReducer"
import { usePages, useRootPage } from "../../util/store"
import { Node } from './Node'
import { useNavigate } from '@tanstack/react-router'

export default function PageTree() {

    const navigate = useNavigate()
    const pages = usePages()
    const page = useRootPage()
    const [progress, setProgress] = useState(0)


    const dispatch = useDispatch()

    // Get the query string part of the URL
    const queryString = window.location.search;

    // Parse the query string using URLSearchParams
    const urlParams = new URLSearchParams(queryString)

    const selectPage = urlParams.get('select')

    async function fetchData() {
        const userAttributes = await fetchUserAttributes()
        let pages = await getPages(userAttributes.email as string)
        dispatch(pagesUpdated(pages))

        if (selectPage == null && pages.length > 0) {
            dispatch(rootPageUpdated(pages[0]))
            dispatch(pageUpdated(pages[0]))
        }


    }

    useEffect(() => {
        fetchData()
    }, [])

    const enterPreview = () => {
        dispatch(modeUpdated("visiting"))
    }

    const displayProgress = () => {
        var i = 0
        var intr = setInterval(function () {
            setProgress(i)
            // clear the interval if `i` reached 100
            if (++i == 201) {
                clearInterval(intr)
            }
        }, 25)
    }

    const publish = async () => {
        displayProgress()
        let pages = await publishPage(page)

        let newPage = pages.find((p) => p.id = page.id)
        dispatch(rootPageUpdated(newPage))
        dispatch(pageUpdated(newPage))
    }

    const createNewPage = async () => {

        navigate({ to: "/onboarding" })
    }


    return <div className="h-[100dvh] w-[260px] bg-[#F2EEF0] bg-opacity-40 border-r border-light shadow-lg flex flex-col">

        <div className="m-1 mt-20 px-3 py-2 flex flex-row items-center hover:bg-primary-light hover:bg-opacity-60 rounded-sm cursor-pointer" onClick={createNewPage}>
            <AddBlockIcon /><div className="font-bold">Start New Project</div>
        </div>

        <div className='border-b border-primary mx-3' />
        {
            pages.length > 0 && <div className="flex flex-col h-full">



                <div className="w-full flex-grow overflow-y-auto">
                    <div className="px-3 py-2 font-bold text-sm">
                        Drafts
                    </div>
                    <div className="flex flex-col">
                        {
                            pages.map((page) => <Node key={page.id} {...page} root={page} ident={0} />)
                        }
                    </div>
                </div>

                {
                    (page && page.id) && <div className="pt-4 mt-auto">
                        <div className="w-full py-2">
                            {(progress > 0 && progress < 100) && <div className="px-3"><Progress percentage={progress} /></div>}
                            {(progress > 100 && progress < 200) && <div className="px-3"><Alert type="success" title="Project published" message="Click `Share` to get a link with applied changes"></Alert></div>}
                            <div className="w-[100%] px-3 py-1 flex gap-x-2">
                                <div className="w-[50%]"><Button text="Preview" color="default" action={enterPreview} /></div>

                                <a href={`/${page.id}`} target="_blank" className="bg-primary-light hover:opacity-80 flex justify-center items-center cursor-pointer rounded-md w-[50%] font-bold">Share</a>
                            </div>

                            <div className="w-[100%] px-3 py-1">
                                <Button text="Publish" action={publish} />
                            </div>

                        </div>

                    </div>
                }



            </div>
        }

    </div>
}