import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PageState {
    pageId: string
    page: any
    mode: string,
    blocked: boolean,
    expanedToolbar: string | null
  }

let initialState: PageState = {
    pageId: "01858c7d-17dc-4c64",
    page: null,
    mode: "visiting",
    blocked: false,
    expanedToolbar: null
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