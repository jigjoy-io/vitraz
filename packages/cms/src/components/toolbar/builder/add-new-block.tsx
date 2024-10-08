import React from "react"
import { useDispatch } from "react-redux"
import TemplateFactory from "../../../factories/template-factory"
import { AddBlockIcon } from "../../../icons/add-block-icon"
import { insertBlock } from "../../../reducers/page-reducer"
import ToolbarButtonWrapper from "../toolbar-button-wrapper"
import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    en: {
        click: "Click",
        ctrlClick: "Ctrl-click",
        addBelow: "to add below",
        addAbove: "to add block above"
    },
    sr: {
        click: "Klikni",
        ctrlClick: "Ctrl-klik",
        addBelow: "da dodaš blok dole",
        addAbove: "da dodaš blok gore"
    }
})

localization.setLanguage('sr')

export function AddNewBlock(props) {


    const dispatch = useDispatch()

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