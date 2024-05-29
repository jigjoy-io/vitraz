import { createSlice, PayloadAction } from "@reduxjs/toolkit"

let initialState: any = {
    activeToolbarBlockId: null,
    isInteractionBlocked: false,
}

export const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,

    reducers: {

        openToolbar: (state, action: PayloadAction<any>) => {
            state.activeToolbarBlockId = action.payload
        },

        closeToolbar: (state) => {
            state.activeToolbarBlockId = null
        },

        blockInteraction: (state, action: PayloadAction<any>) => {
            state.isBlock = action.payload
        },

    }
})

export const { openToolbar, closeToolbar, blockInteraction } = toolbarSlice.actions


export default toolbarSlice.reducer