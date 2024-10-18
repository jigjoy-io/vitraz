import { AnimatePresence, LazyMotion, m } from "framer-motion"
import { AppDispatch, useLanguage, useSidebarComponent, useSidebarVisible } from "../../../util/store"
import React from "react"
import { useDispatch } from "react-redux"
import LocalizedStrings from "react-localization"
import { sidebarExpanded } from "../../../reducers/sidebar-reducer"
import ToolbarButtonWrapper from "../toolbar/toolbar-button-wrapper"


const animation = {
    hidden: {
        x: 500
    },
    show: {
        x: 0
    },
    exit: {
        x: 500
    }
}

const transition = {
    ease: "linear",
    duration: 0.15,
}

const loadFeatures = () => import("../../../util/animations").then(res => res.default)

let localization = new LocalizedStrings({
    US: {
        closePanel: 'Close panel'
    },
    RS: {
        closePanel: 'Zatvori'
    }
})

export function RightSideMenu() {

    const lang = useLanguage()
    localization.setLanguage(lang)

    const sidebar = {
        visible: useSidebarVisible(),
        component: useSidebarComponent()
    }

    const dispatch = useDispatch<AppDispatch>()


    return <LazyMotion features={loadFeatures}>
        <AnimatePresence>
            {sidebar.visible &&

                <m.div variants={animation} initial="hidden" animate="show" exit="exit" transition={transition}>

                    <div className="border-l border-light shadow-lg fixed right-0 bottom-0 h-[100dvh] w-[25%] bg-[white] flex flex-col">

                        <div className="h-[24px] w-[24px] m-2" onClick={() => dispatch(sidebarExpanded({ expanded: false, component: null }))}>
                            <ToolbarButtonWrapper tooltip={<div className="text-[14px]">{localization.closePanel}</div>}>
                                <div aria-label="Close panel" className="cursor-pointer items-center justify-center rounded-[6px] h-[24px] w-[24px] p-1 bg-[transparent] hover:bg-primary-light">
                                    <svg viewBox="0 0 16 16" className="w-[16px] h-[16px] block" fill="#2E2E2E">
                                        <path d="M2.25781 14.1211C2.47656 14.1211 2.66797 14.0391 2.81836 13.8887L8.14355 8.67969C8.32812 8.49512 8.41699 8.29688 8.41699 8.06445C8.41699 7.8252 8.32812 7.62012 8.14355 7.44922L2.81836 2.24023C2.66797 2.08984 2.4834 2.00781 2.25781 2.00781C1.81348 2.00781 1.46484 2.35645 1.46484 2.80078C1.46484 3.0127 1.55371 3.21777 1.7041 3.375L6.50977 8.05762L1.7041 12.7539C1.55371 12.9043 1.46484 13.1094 1.46484 13.3281C1.46484 13.7725 1.81348 14.1211 2.25781 14.1211ZM8.36914 14.1211C8.58789 14.1211 8.77246 14.0391 8.92285 13.8887L14.2549 8.67969C14.4395 8.49512 14.5283 8.29688 14.5283 8.06445C14.5283 7.8252 14.4326 7.62012 14.2549 7.44922L8.92285 2.24023C8.77246 2.08984 8.58789 2.00781 8.36914 2.00781C7.9248 2.00781 7.56934 2.35645 7.56934 2.80078C7.56934 3.0127 7.66504 3.21777 7.81543 3.375L12.6211 8.05762L7.81543 12.7539C7.66504 12.9043 7.56934 13.1094 7.56934 13.3281C7.56934 13.7725 7.9248 14.1211 8.36914 14.1211Z" fill="#2E2E2E">
                                        </path>
                                    </svg>
                                </div>
                            </ToolbarButtonWrapper>
                        </div>

                        {sidebar.component && <sidebar.component />}

                    </div>


                </m.div>
            }


        </AnimatePresence>
    </LazyMotion>

}