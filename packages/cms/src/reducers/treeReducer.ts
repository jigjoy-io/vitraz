import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface TreeState {
    expandedPages: string [],
  }

let initialState: TreeState = {
    expandedPages: []
}


export const treeSlice = createSlice({
    name: 'tree',
    initialState,

    reducers: {

        pageCollapsed: (state, action: PayloadAction<any>) => {
            state.expandedPages = state.expandedPages.filter((node: any) => node !== action.payload)
        },

        pageExpanded: (state, action: PayloadAction<any>) => {
            state.expandedPages.push(action.payload)
        }
    }
})

export const { pageCollapsed, pageExpanded } = treeSlice.actions


export default treeSlice.reducer