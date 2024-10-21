import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getPage } from "../api/page"
import { addBlock } from "../util/traversals/add-block"
import { deleteBlock } from "../util/traversals/delete-block"
import { pushBlock } from "../util/traversals/push-block"
import { replaceBlock } from "../util/traversals/replace-block"

interface PageState {
    modified: any,
    rootPage: any,
    activePage: any,
    mode: string,
    activeBlock: string | null,
    pages: any [],
    currentCarouselPage: number | null,
    activePlayer: string | null
}

let initialState: PageState = {
    modified: null,
    rootPage: null,
    activePage: null,
    mode: "visiting",
    activeBlock: null,
    pages: [],
    currentCarouselPage: null,
    activePlayer: null
}

export const fetchPage = createAsyncThunk('loadPage', async (id: string) => {
    return await getPage(id)
})

export const pageSlice = createSlice({
    name: 'page',
    initialState,

    reducers: {

        rootPageUpdated: (state, action: PayloadAction<any>) =>{

            let page: any = action.payload
            state.rootPage = page

            if(state.rootPage) {
                let index = state.pages.findIndex((p: any) => p.id == page.id)
                state.pages.splice(index, 1, page)
            }


        },

        pageUpdated: (state, action: PayloadAction<any>) => {
            state.activePage = action.payload
        },

        insertBlock: (state, action: PayloadAction<any>) => {
            let page = JSON.parse(JSON.stringify(state.activePage))
            state.activePage = addBlock(page, action.payload)
            state.modified = Date.now()
        },

        appendBlock: (state, action: PayloadAction<any>) => {
            let page = JSON.parse(JSON.stringify(state.activePage))
            state.activePage = pushBlock(page, action.payload)
            state.modified = Date.now()
        },

        updateBlock: (state, action: PayloadAction<any>) => {
            let page = JSON.parse(JSON.stringify(state.activePage))
            state.activePage = replaceBlock(page, action.payload)
            state.modified = Date.now()
        },

        removeBlock: (state, action: PayloadAction<string>) => {
            let page = JSON.parse(JSON.stringify(state.activePage))
            state.activePage = deleteBlock(page, action.payload)
            state.modified = Date.now()
        },

        focusBlock: (state, action: PayloadAction<any>) => {
            state.activeBlock = action.payload
        },

        modeUpdated: (state, action: PayloadAction<any>) => {
            state.mode = action.payload
        },

        pagesUpdated: (state, action: PayloadAction<any>) => {
            state.pages = action.payload
        },

        carouselPageSwitched: (state, action: PayloadAction<any>) => {
            state.currentCarouselPage = action.payload
        },

        activePlayerUpdated: (state, action: PayloadAction<any>) => {
            state.activePlayer = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPage.fulfilled, (state, action) => {
                state.rootPage = action.payload
                state.activePage = action.payload
            })
    }
})

export const { rootPageUpdated, pageUpdated, modeUpdated, insertBlock, removeBlock, updateBlock, appendBlock, focusBlock, pagesUpdated, carouselPageSwitched, activePlayerUpdated } = pageSlice.actions


export default pageSlice.reducer