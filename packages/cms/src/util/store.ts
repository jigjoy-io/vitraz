import { combineReducers, configureStore } from "@reduxjs/toolkit"
import pageReducer from "../reducers/page-reducer"
import { useDispatch, useSelector } from "react-redux"
import toolbarReducer from "../reducers/toolbar-reducer"
import authReducer from "../reducers/auth-reducer"
import localizationReducer from "../reducers/localization-reducer"
import sidebarReducer from "../reducers/sidebar-reducer"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"

const rootReducer = combineReducers({
	toolbar: toolbarReducer,
	page: pageReducer,
	auth: authReducer,
	sidebar: sidebarReducer,
	localization: localizationReducer,
})

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["localization", "page"],
}

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useBlocked = () => useAppSelector((state: any) => state.toolbar.blocked)

export const useSidebarVisible = () => useAppSelector((state: any) => state.sidebar.expanded)
export const useSidebarComponent = () => useAppSelector((state: any) => state.sidebar.component)

export const useAuthorized = () => useAppSelector((state: any) => state.auth.authorized)

export const usePage = () => useAppSelector((state: any) => state.page.activePage)
export const useActivePlayer = () => useAppSelector((state: any) => state.page.activePlayer)
export const useCurrentCarouselPage = () => useAppSelector((state: any) => state.page.currentCarouselPage)
export const useModified = () => useAppSelector((state: any) => state.page.modified)
export const usePages = () => useAppSelector((state: any) => state.page.pages)
export const useRootPage = () => useAppSelector((state: any) => state.page.rootPage)
export const useMode = () => useAppSelector((state: any) => state.page.mode)
export const useSelected = () => useAppSelector((state: any) => state.page.selected)
export const useExpandedPages = () => useAppSelector((state: any) => state.page.expandedPages)

export const useActiveBlock = () => useAppSelector((state: any) => state.page.activeBlock)
export const useLanguage = () => useAppSelector((state: any) => state.localization.language)
