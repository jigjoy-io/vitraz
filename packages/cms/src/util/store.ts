
import { configureStore } from '@reduxjs/toolkit'
import page from '../reducers/page'

export const store = configureStore({
    reducer: {
        page: page
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>