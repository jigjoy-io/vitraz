import React from "react"
import { MoreOptionsIcon } from "../icons/MoreOptionsIcon"
import ToolbarButtonWrapper from "./ToolbarButtonWrapper"

export class OpenMenuButton extends React.Component<any> {

    render() {
        return <>
        <ToolbarButtonWrapper>
            <MoreOptionsIcon />
        </ToolbarButtonWrapper>
        
        </>
    }

}

