import React from "react"
import { useDispatch } from "react-redux"
import Page from "../../components/Page"
import { modeUpdated } from "../../reducers/pageReducer"

export function Preview() {

    const dispatch = useDispatch()
    
    const turnOffPreview = () => {
        dispatch(modeUpdated("editing"))
    }

    return <div className="flex flex-col">
        <div className="absolute top-0 h-[50px] bg-[#74EDDF] flex items-center justify-center w-[100%] z-50">
            You're in the preview mode. Click <span className="font-bold cursor-pointer" onClick={turnOffPreview}>&nbsp;here&nbsp;</span> to switch back to editing.</div>
        <Page />
    </div>
}