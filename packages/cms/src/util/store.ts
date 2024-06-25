
import { configureStore } from '@reduxjs/toolkit'
import pageReducer from '../reducers/pageReducer'
import { useDispatch, useSelector } from "react-redux"
import toolbarReducer from '../reducers/toolbarReducer'

export const store = configureStore({
    reducer: {
        toolbar: toolbarReducer,
        page: pageReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useBlocked = () => useAppSelector((state: any) => state.toolbar.blocked)
export const useExpandedToolbar = () => useAppSelector((state: any) => state.toolbar.expandedToolbar)

export const useEditorOptions = () => useAppSelector((state: any) => state.toolbar.editingOptions)

export const usePageId = () => useAppSelector((state: any) => state.page.pageId)
export const usePage = () => useAppSelector((state: any) => state.page.page)
export const useInnerPage = () => useAppSelector((state: any) => state.page.innerPage)
export const useMode = () => useAppSelector((state: any) => state.page.mode)
export const useActiveBlock = () => useAppSelector((state: any) => state.page.activeBlock)