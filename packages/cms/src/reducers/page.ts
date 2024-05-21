import { createSlice, PayloadAction } from "@reduxjs/toolkit"

let initialState: any = {
    blockEvents: false,
    toolbar: null
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,

    reducers: {

        setBlockEvents: (state, action: PayloadAction<any>) => {
            state.blockEvents = action.payload
        },

        openToolbar: (state, action: PayloadAction<any>) => {
            state.toolbar = action.payload
        },

        closeToolbar: (state) => {
            state.toolbar = null
        }

    }
})

export const { setBlockEvents, openToolbar, closeToolbar } = pageSlice.actions


export default pageSlice.reducer