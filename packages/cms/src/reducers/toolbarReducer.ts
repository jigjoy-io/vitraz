import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ToolbarState {
    blocked: boolean,
    expandedToolbar: string | null
  }

let initialState: ToolbarState = {
    blocked: false,
    expandedToolbar: null
}


export const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,

    reducers: {

        blockingUpdated: (state, action: PayloadAction<any>) => {
            state.blocked = action.payload
        },

        expandedToolbarUpdated: (state, action: PayloadAction<any>) => {
            state.expandedToolbar = action.payload
        }
    }
})

export const { blockingUpdated, expandedToolbarUpdated } = toolbarSlice.actions


export default toolbarSlice.reducer