import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import ToolbarButtonWrapper from "../toolbar-button-wrapper"
import LocalizedStrings from "react-localization"
import { insertBlock } from "../../../../reducers/page-reducer"
import TemplateFactory from "../../../../util/factories/templates/template-factory"
import { useLanguage } from "../../../../util/store"
import AddBlockIcon from "../../../../icons/add-block-icon"

let localization = new LocalizedStrings({
    US: {
        click: "Click",
        ctrlClick: "Ctrl-click",
        addBelow: "to add below",
        addAbove: "to add block above"
    },
    RS: {
        click: "Klikni",
        ctrlClick: "Ctrl-klik",
        addBelow: "da dodaš blok dole",
        addAbove: "da dodaš blok gore"
    }
})

export function AddNewBlock(props) {

    const lang = useLanguage()
    const dispatch = useDispatch()

    useEffect(() => {
        localization.setLanguage(lang)
    }, [])

    const tooltip = <div className="text-center text-[14px]">
        <div>
            <span className="font-extrabold">{localization.click}</span> {localization.addBelow}
        </div>
        <span className="font-extrabold">{localization.ctrlClick}</span> {localization.addAbove}
    </div>

    const addSelector = (e: any) => {

        let position = 'below'
        if (e.ctrlKey) {
            position = 'above'
        }

        let selector = TemplateFactory.createBlockSelector()

        dispatch(insertBlock({
            referenceBlock: props.id,
            block: selector,
            position: position
        }))

    }


    return <div onClick={addSelector}>
        <ToolbarButtonWrapper tooltip={tooltip}>
            <AddBlockIcon />
        </ToolbarButtonWrapper>
    </div>
}