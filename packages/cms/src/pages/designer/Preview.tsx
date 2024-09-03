import React from "react"
import { useDispatch } from "react-redux"
import Page from "../../components/Page"
import { modeUpdated } from "../../reducers/pageReducer"

export function Preview() {

    const dispatch = useDispatch()
    
    const turnOffPreview = () => {
        dispatch(modeUpdated("editing"))
    }

    return <>
        <div className="sticky top-0 h-[50px] bg-[#74EDDF] flex items-center justify-center z-10">
            You're in the preview mode. Click <span className="font-bold cursor-pointer" onClick={turnOffPreview}>&nbsp;here&nbsp;</span> to switch back to editing.</div>
        <Page />
    </>
}