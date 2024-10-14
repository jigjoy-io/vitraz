import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SidebarState {
    expanded: boolean,
    component: any
}

let initialState: SidebarState = {
    expanded: false,
    component: null
}


export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,

    reducers: {

        sidebarExpanded: (state, action: PayloadAction<SidebarState>) => {
            state.expanded = action.payload.expanded
            state.component = action.payload.component
        }
    }
})

export const { sidebarExpanded } = sidebarSlice.actions


export default sidebarSlice.reducer