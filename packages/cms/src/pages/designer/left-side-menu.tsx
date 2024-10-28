import { getCurrentUser } from "aws-amplify/auth"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPages, publishPage } from "../../api/page"
import Alert from "../../components/alert/alert"
import Button from "../../components/button/button"
import { pagesUpdated, pageUpdated, rootPageUpdated } from "../../reducers/page-reducer"
import { useLanguage, usePages, useRootPage } from "../../util/store"
import Node from './node'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import AnalyticsIcon from "../../icons/analytics-icon"
import { sidebarExpanded } from "../../reducers/sidebar-reducer"
import Loader from "../../components/loader/loader"
import localization from './left-side-menu.localization'
import HelpIcon from "../../icons/help-icon"
import AddBlockIcon from "../../icons/add-block-icon"
import ViewAnalytics from "./right-side-menu/components/view-analytics"
import Help from "./right-side-menu/components/help"
import UserMenu from "../authorization/user-menu/user-menu"

export default function LeftSideMenu() {
    const navigate = useNavigate()
    const pages = usePages()
    const page = useRootPage()
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const dispatch = useDispatch()
    const lang = useLanguage()
    localization.setLanguage(lang)

    const { action } = useSearch({
        from: '/interactive-content-designer',
        select: (search: any) => {
            return {
                action: search.action
            }
        }
    })

    async function fetchData() {
        const currentUser = await getCurrentUser()

        let fetchedPages = await getPages(currentUser.signInDetails?.loginId as string)


        if (!page) {
            dispatch(rootPageUpdated(fetchedPages[0]))
            dispatch(pageUpdated(fetchedPages[0]))
            dispatch(pagesUpdated(fetchedPages))
        } else {
            const fetchedPage = fetchedPages.find(fp => fp.id == page.id)
            dispatch(rootPageUpdated(fetchedPage))
            dispatch(pageUpdated(fetchedPage))
            dispatch(pagesUpdated(fetchedPages))
        }





    }

    useEffect(() => {
        if(action!='page-creation')
            fetchData()
    }, [])

    useEffect(() => {
        localization.setLanguage(lang)
    }, [lang])

    const enterPreview = () => {
        navigate({ to: "/preview" })
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
        lang && <div className="h-[100dvh] max-h-[100dvh] bg-[#F2EEF0] bg-opacity-30 border-r border-light shadow-lg flex flex-col flex-none">

            <UserMenu />
            <div className="mx-2 mt-5 px-3 py-2 flex flex-row items-center hover:bg-primary-light hover:bg-opacity-60 rounded-lg cursor-pointer border" onClick={createNewPage}>
                <AddBlockIcon /><div className="font-bold">{localization.newProject}</div>
            </div>

            <div className="grow overflow-y-auto mt-4">
                {pages.length > 0 && (
                    <div className="flex flex-col">
                        <div className="w-full">
                            <div className="px-3 py-2 text-sm font-bold">
                                {localization.drafts}
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
                    {localization.options}
                </div>

                {/* <div className="flex flex-col pl-4 hover:cursor-pointer hover:bg-primary-light h-[30px] items-center" onClick={() => dispatch(sidebarExpanded({ expanded: true, component: Tutorial }))}>

                    <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="pr-2 flex items-center"><LogoIcon /></div>
                        <div className="flex items-center">{localization.jigJoyTutorial}</div>
                    </div>

                </div> */}

                <div className="flex flex-col pl-4 hover:cursor-pointer hover:bg-primary-light h-[30px] items-center" onClick={() => dispatch(sidebarExpanded({ expanded: true, component: ViewAnalytics }))}>
                    <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="pr-2 flex items-center"><AnalyticsIcon /></div>
                        <div className="flex items-center">{localization.viewAnalytics}</div>
                    </div>

                </div>



                <div className="flex flex-col pl-4 hover:cursor-pointer hover:bg-primary-light h-[30px] items-center" onClick={() => dispatch(sidebarExpanded({ expanded: true, component: Help }))}>

                    <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="pr-2 flex items-center"><HelpIcon /></div>
                        <div className="flex items-center">{localization.help}</div>
                    </div>

                </div>



            </div>

            <div className="w-full relative h-[300px] min-h-[300px] pt-4">
                {(page) && (

                    <div className="w-full py-2 absolute bottom-0">

                        {isLoading && (
                            <div className="px-3">
                                <div className="w-full h-fit"><Loader message={localization.publishingInProgress} /></div>
                            </div>
                        )}
                        {showSuccess && (
                            <div className="px-3">
                                <Alert
                                    type="success"
                                    title={localization.publishSuccess}
                                    message={localization.publishSuccessMessage}
                                />
                            </div>
                        )}
                        {showError && (
                            <div className="px-3">
                                <Alert
                                    type="danger"
                                    title={localization.publishFailed}
                                    message={localization.publishFailedMessage}
                                />
                            </div>
                        )}
                        <div className="w-[100%] px-3 py-1 flex gap-x-2">
                            <div className="w-[50%]"><Button text={localization.preveiw} color="default" width="w-full" action={enterPreview} /></div>
                            <Link to={`/${page.id}?lang=${lang}`} target="_blank" className="bg-primary-light hover:opacity-80 flex justify-center items-center cursor-pointer rounded-md w-[50%] font-bold">{localization.share}</Link>
                        </div>
                        <div className="w-[100%] px-3 py-1">
                            <Button width="w-full" text={localization.publish} action={publish} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}