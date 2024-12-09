import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SidebarState {
	expanded: boolean
	hovered: string | null
	component: any
}

let initialState: SidebarState = {
	expanded: false,
	hovered: null,
	component: null,
}

export const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,

	reducers: {
		sidebarExpanded: (state, action: PayloadAction<any>) => {
			state.expanded = action.payload.expanded
			state.component = action.payload.component
		},

		nodeHovered: (state, action: PayloadAction<string | null>) => {
			state.hovered = action.payload
		},
	},
})

export const { sidebarExpanded, nodeHovered } = sidebarSlice.actions

export default sidebarSlice.reducer
