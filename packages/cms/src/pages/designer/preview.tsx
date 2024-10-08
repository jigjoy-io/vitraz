import React from "react"
import { useDispatch } from "react-redux"
import Page from "../../components/page"
import { modeUpdated } from "../../reducers/page-reducer"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    en: {
        previewMessagePart1: "You're in the preview mode. Click",
        previewMessagePart2: "here",
        previewMessagePart3: "to switch back to editing.",
    },
    sr: {
        previewMessagePart1: "Nalazite se u režimu za testiranje. Kliknite",
        previewMessagePart2: "ovde",
        previewMessagePart3: "za povratak u editor.",
    }
})

localization.setLanguage('sr')

export function Preview() {

    const dispatch = useDispatch()

    const turnOffPreview = () => {
        dispatch(modeUpdated("editing"))
    }

    return <div className="flex flex-col">
        <div className="absolute top-0 h-[50px] bg-[#74EDDF] flex items-center justify-center w-[100%] z-50">
            {localization.previewMessagePart1}<span className="font-bold cursor-pointer" onClick={turnOffPreview}>&nbsp;{localization.previewMessagePart2}&nbsp;</span> {localization.previewMessagePart3}</div>
        <Page />
    </div>
}