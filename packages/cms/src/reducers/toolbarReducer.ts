import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ToolbarState {
    blocked: boolean,
    expanedToolbar: string | null
  }

let initialState: ToolbarState = {
    blocked: false,
    expanedToolbar: null
}


export const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,

    reducers: {

        blockingUpdated: (state, action: PayloadAction<any>) => {
            state.blocked = action.payload
        },

        expanedToolbarUpdated: (state, action: PayloadAction<any>) => {
            state.expanedToolbar = action.payload
        }
    }
})

export const { blockingUpdated, expanedToolbarUpdated } = toolbarSlice.actions


export default toolbarSlice.reducer