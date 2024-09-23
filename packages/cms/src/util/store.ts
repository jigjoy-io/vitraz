
import { configureStore } from '@reduxjs/toolkit'
import pageReducer from '../reducers/pageReducer'
import { useDispatch, useSelector } from "react-redux"
import toolbarReducer from '../reducers/toolbarReducer'
import authReducer from '../reducers/authReducer'
import treeReducer from '../reducers/treeReducer'

export const store = configureStore({
    reducer: {
        toolbar: toolbarReducer,
        tree: treeReducer,
        page: pageReducer,
        auth: authReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useBlocked = () => useAppSelector((state: any) => state.toolbar.blocked)
export const useExpandedToolbar = () => useAppSelector((state: any) => state.toolbar.expandedToolbar)
export const useExpandedPages = () => useAppSelector((state: any) => state.tree.expandedPages)

export const useAuthorized = () => useAppSelector((state: any) => state.auth.authorized)

export const usePage = () => useAppSelector((state: any) => state.page.activePage)
export const useCurrentCarouselPage = () => useAppSelector((state: any) => state.page.currentCarouselPage)
export const useModified = () => useAppSelector((state: any) => state.page.modified)
export const usePages = () => useAppSelector((state: any) => state.page.pages)
export const useRootPage = () => useAppSelector((state: any) => state.page.rootPage)
export const useMode = () => useAppSelector((state: any) => state.page.mode)
export const useActiveBlock = () => useAppSelector((state: any) => state.page.activeBlock)