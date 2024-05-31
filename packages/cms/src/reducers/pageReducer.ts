import { createSlice, PayloadAction } from "@reduxjs/toolkit"

let initialState: any = {
    pageId: "48d7d761-f58e-4425-ac77-26a20e7813a6",
    mode: "editing"
}


export const pageSlice = createSlice({
    name: 'page',
    initialState,

    reducers: {

        loadPage: (state, action: PayloadAction<any>) => {
            state.pageId = action.payload.pageId
            state.mode = action.payload.mode
        }

    }
})

export const { loadPage } = pageSlice.actions


export default pageSlice.reducer


