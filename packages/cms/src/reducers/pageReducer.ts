import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getPage } from "../api/page"
import { addBlock } from "../util/traversals/addBlock"
import { deleteBlock } from "../util/traversals/deleteBlock"
import { pushBlock } from "../util/traversals/pushBlock"
import { replaceBlock } from "../util/traversals/replaceBlock"

interface PageState {
    pageId: string,
    rootPage: any,
    activePage: any,
    mode: string,
    activeBlock: string | null
}

let initialState: PageState = {
    pageId: "01858c7d-17dc-4c64",
    rootPage: null,
    activePage: null,
    mode: "visiting",
    activeBlock: null
}

export const fetchPage = createAsyncThunk('loadPage', async (id: string) => {
    return await getPage(id)
})

export const pageSlice = createSlice({
    name: 'page',
    initialState,

    reducers: {

        rootPageUpdated: (state, action: PayloadAction<any>) =>{
            state.rootPage = action.payload
        },

        pageUpdated: (state, action: PayloadAction<any>) => {
            state.activePage = action.payload
        },

        insertBlock: (state, action: PayloadAction<any>) => {
            let page = JSON.parse(JSON.stringify(state.activePage))
            state.activePage = addBlock(page, action.payload)
        },

        appendBlock: (state, action: PayloadAction<any>) => {
            let page = JSON.parse(JSON.stringify(state.activePage))
            state.activePage = pushBlock(page, action.payload)
        },

        updateBlock: (state, action: PayloadAction<any>) => {
            let page = JSON.parse(JSON.stringify(state.activePage))
            state.activePage = replaceBlock(page, action.payload)
        },

        removeBlock: (state, action: PayloadAction<string>) => {
            let page = JSON.parse(JSON.stringify(state.activePage))
            state.activePage = deleteBlock(page, action.payload)
        },

        focusBlock: (state, action: PayloadAction<any>) => {
            state.activeBlock = action.payload
        },

        modeUpdated: (state, action: PayloadAction<any>) => {
            state.mode = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPage.fulfilled, (state, action) => {
                console.log(action.payload)
                state.rootPage = action.payload
                state.activePage = action.payload
            })
    }
})

export const { rootPageUpdated, pageUpdated, modeUpdated, insertBlock, removeBlock, updateBlock, appendBlock, focusBlock } = pageSlice.actions


export default pageSlice.reducer