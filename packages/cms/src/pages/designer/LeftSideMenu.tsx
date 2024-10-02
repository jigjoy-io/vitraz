import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPages, publishPage } from "../../api/page"
import Alert from "../../components/alert/Alert"
import Button from "../../components/button/Button"
import { AddBlockIcon } from "../../icons/AddBlockIcon"
import { modeUpdated, pagesUpdated, pageUpdated, rootPageUpdated } from "../../reducers/pageReducer"
import { usePages, useRootPage, useSidebarVisible } from "../../util/store"
import { Node } from './Node'
import { useNavigate, useSearch } from '@tanstack/react-router'
import AnalyticsIcon from "../../icons/AnalyticsIcon"
import { sidebarExpanded } from "../../reducers/sidebarReducer"
import Loader from "../../components/loader/Loader"

export default function LeftSideMenu() {
    const navigate = useNavigate()
    const pages = usePages()
    const page = useRootPage()
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const sidebarVisible = useSidebarVisible()
    const dispatch = useDispatch()

    const pageId = useSearch({
        from: '/dashboard',
        select: (search: any) => search.pageId,
    })

    async function fetchData() {
        const currentUser = await getCurrentUser()
        
        let pages = await getPages(currentUser.signInDetails?.loginId as string)
        dispatch(pagesUpdated(pages))

        if (pageId == null && pages.length > 0) {
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

    const publish = async () => {
        setIsLoading(true)
        setShowSuccess(false)
        setShowError(false)
        try {
            let pages = await publishPage(page)
            let newPage = pages.find((p) => p.id === page.id)
            dispatch(rootPageUpdated(newPage))
            dispatch(pageUpdated(newPage))
            setShowSuccess(true)
        } catch (error) {
            setShowError(true)
        } finally {
            setIsLoading(false)
            setTimeout(() => {
                setShowSuccess(false)
                setShowError(false)
            }, 3000)
        }
    }

    const createNewPage = async () => {
        navigate({ to: "/onboarding" })
    }

    return (
        <div className="h-[100dvh] max-h-[100dvh] w-[260px] bg-[#F2EEF0] bg-opacity-30 border-r border-light shadow-lg flex flex-col">
            <div className="m-1 mt-20 px-3 py-2 flex flex-row items-center hover:bg-primary-light hover:bg-opacity-60 rounded-sm cursor-pointer" onClick={createNewPage}>
                <AddBlockIcon /><div className="font-bold">Start New Project</div>
            </div>

            <div className='border-b border-primary mx-3' />
            <div className="grow overflow-y-auto">
                {pages.length > 0 && (
                    <div className="flex flex-col">
                        <div className="w-full">
                            <div className="px-3 py-2 text-sm font-bold">
                                Drafts
                            </div>
                            <div className="flex flex-col">
                                {pages.map((page) => (
                                    <Node key={page.id} {...page} root={page} ident={0} />
                                ))}
                            </div>
                        </div>

                    </div>
                )}

            </div>


            <div className="w-full">
                <div className="px-3 py-2 text-sm font-bold">
                    Options
                </div>
                <div className="flex flex-col pl-4 hover:cursor-pointer hover:bg-primary-light h-[30px] items-center" onClick={() => dispatch(sidebarExpanded(!sidebarVisible))}>
                    <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="pl-1 pr-2 flex items-center"><AnalyticsIcon /></div>
                        <div className="flex items-center">View Analytics</div>
                    </div>
                </div>

            </div>

            <div className="w-full relative h-[300px] min-h-[300px] pt-4">
                {(page) && (

                    <div className="w-full py-2 absolute bottom-0">

                        {isLoading && (
                            <div className="px-3">
                                <div className="w-full h-fit"><Loader message="Publishing page in progress" /></div>
                            </div>
                        )}
                        {showSuccess && (
                            <div className="px-3">
                                <Alert
                                    type="success"
                                    title="Project published"
                                    message="Click `Share` to get a link with applied changes"
                                />
                            </div>
                        )}
                        {showError && (
                            <div className="px-3">
                                <Alert
                                    type="danger"
                                    title="Error"
                                    message="Something went wrong. The page was not published. Please try again later or contact JigJoy support."
                                />
                            </div>
                        )}
                        <div className="w-[100%] px-3 py-1 flex gap-x-2">
                            <div className="w-[50%]"><Button text="Preview" color="default" action={enterPreview} /></div>
                            <a href={`/${page.id}`} target="_blank" className="bg-primary-light hover:opacity-80 flex justify-center items-center cursor-pointer rounded-md w-[50%] font-bold">Share</a>
                        </div>
                        <div className="w-[100%] px-3 py-1">
                            <Button text="Publish" action={publish} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}