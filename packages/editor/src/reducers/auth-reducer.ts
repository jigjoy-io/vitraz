import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
	authorized: boolean
	account: string | null
}

let initialState: AuthState = {
	authorized: false,
	account: null,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,

	reducers: {
		accountUpdated: (state, action: PayloadAction<any>) => {
			state.authorized = action.payload.authorized
			state.account = action.payload.account
		},
	},
})

export const { accountUpdated } = authSlice.actions

export default authSlice.reducer
