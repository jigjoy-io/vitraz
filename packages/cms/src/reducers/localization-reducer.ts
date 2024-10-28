import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LocalizationState {
	language: string
}

let initialState: LocalizationState = {
	language: "US",
}

export const localizationSlice = createSlice({
	name: "localization",
	initialState,

	reducers: {
		languageUpdated: (state, action: PayloadAction<any>) => {
			state.language = action.payload
		},
	},
})

export const { languageUpdated } = localizationSlice.actions

export default localizationSlice.reducer
