import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ToolbarState {
    blocked: boolean
  }

let initialState: ToolbarState = {
    blocked: false
}


export const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,

    reducers: {

        blockingUpdated: (state, action: PayloadAction<any>) => {
            state.blocked = action.payload
        }
    }
})

export const { blockingUpdated } = toolbarSlice.actions


export default toolbarSlice.reducer