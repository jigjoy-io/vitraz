
import { configureStore } from '@reduxjs/toolkit'
import toolbarReducer from '../reducers/toolbarReducer'
import pageReducer from '../reducers/pageReducer'
import { useDispatch, useSelector } from "react-redux"

export const store = configureStore({
    reducer: {
        toolbar: toolbarReducer,
        page: pageReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const usePageId = () => useAppSelector((state) => state.page.pageId)
export const usePage = () => useAppSelector((state) => state.page.page)
export const useMode = () => useAppSelector((state) => state.page.mode)