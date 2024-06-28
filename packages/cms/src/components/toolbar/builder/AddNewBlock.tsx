import React from "react"
import { useDispatch } from "react-redux"
import TemplateFactory from "../../../factories/TemplateFactory"
import { AddBlockIcon } from "../../../icons/AddBlockIcon"
import { insertBlock } from "../../../reducers/pageReducer"
import ToolbarButtonWrapper from "../ToolbarButtonWrapper"

export function AddNewBlock(props) {


    const dispatch = useDispatch()

    const tooltip = <div className="text-center text-[14px]">
        <div>
            <span className="font-extrabold">Click</span> to add below
        </div>
        <span className="font-extrabold">Ctrl-click</span> to add block above
    </div>

    const addSelector = (e: any) => {

        let position = 'below'
        if (e.ctrlKey) {
            position = 'above'
        }

        let selector = TemplateFactory.get("block-selector")

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