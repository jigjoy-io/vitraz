import React from "react"
import { AddBlockIcon } from "../../../icons/AddBlockIcon"
import ToolbarButtonWrapper from "../ToolbarButtonWrapper"

export function AddNewBlock() {

    return <ToolbarButtonWrapper tooltip="add block">
        <AddBlockIcon />
    </ToolbarButtonWrapper>
}