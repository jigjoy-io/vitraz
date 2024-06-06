import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PageState {
    pageId: string
    page: any
    mode: string
  }

let initialState: PageState = {
    pageId: "01858c7d-17dc-4c64-93e2-f2df71f3657l",
    page: null,
    mode: "visiting"
}


export const pageSlice = createSlice({
    name: 'page',
    initialState,

    reducers: {

        loadPage: (state, action: PayloadAction<any>) => {
            state.pageId = action.payload
        },

        pageUpdated: (state, action: PayloadAction<any>) => {
            state.page = action.payload
        },

        modeUpdated: (state, action: PayloadAction<any>) => {
            state.mode = action.payload
        }

    }
})

export const { pageUpdated, modeUpdated, loadPage } = pageSlice.actions


export default pageSlice.reducer