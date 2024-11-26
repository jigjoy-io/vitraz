import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface EditorState {
	blocked: boolean
	selectedBlocks: []
}

let initialState: EditorState = {
	blocked: false,
	selectedBlocks: [],
}

export const editorSlice = createSlice({
	name: "editor",
	initialState,

	reducers: {
		blockingUpdated: (state, action: PayloadAction<any>) => {
			state.blocked = action.payload
		},
		selectBlocks: (state, action: PayloadAction<any>) => {
			state.selectedBlocks = action.payload
		},
	},
})

export const { blockingUpdated, selectBlocks } = editorSlice.actions

export default editorSlice.reducer
