import { createSlice, PayloadAction } from "@reduxjs/toolkit"

let initialState: any = {
    pageId: "01858c7d-17dc-4c64-93e2-f2df71f3657l",
    mode: "visiting"
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