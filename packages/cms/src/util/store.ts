
import { configureStore } from '@reduxjs/toolkit'
import toolbarReducer from '../reducers/toolbarReducer'
import pageReducer from '../reducers/pageReducer'

export const store = configureStore({
    reducer: {
        toolbar: toolbarReducer,
        page: pageReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>