import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { updatePage } from "../api/page"

interface PageState {
    pageId: string
    page: any,
    innerPage: any,
    mode: string,
    activeBlock: string | null
}

let initialState: PageState = {
    pageId: "01858c7d-17dc-4c64",
    page: null,
    innerPage: null,
    mode: "visiting",
    activeBlock: null
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,

    reducers: {

        loadPage: (state, action: PayloadAction<any>) => {
            state.pageId = action.payload
        },

        pageUpdated: (state, action: PayloadAction<any>) => {
            state.page = action.payload
        },

        innerPageUpdated: (state, action: PayloadAction<any>) => {
            state.innerPage = action.payload
        },

        insertBlock: (state, action: PayloadAction<any>) => {
            let page = state.page.type == "blank" ? state.page : state.innerPage
            page = JSON.parse(JSON.stringify(page))

            let referenceBlockIndex = page.buildingBlocks.findIndex((block: any) => block.id == action.payload.referenceBlock)
            let index = action.payload.position === 'above' ? referenceBlockIndex : referenceBlockIndex + 1
            page.buildingBlocks.splice(index, 0, action.payload.newBlock)

            state.page = page
            updatePage(page)
        },

        appendBlock: (state, action: PayloadAction<any>) => {
            let page = state.page.type == "blank" ? state.page : state.innerPage
            page = JSON.parse(JSON.stringify(page))

            page.buildingBlocks.push(action.payload.block)

            state.page = page
            updatePage(page)
        },

        updateBlock: (state, action: PayloadAction<any>) => {
            let page = state.page.type == "blank" ? state.page : state.innerPage
            page = JSON.parse(JSON.stringify(page))

            let index = page.buildingBlocks.findIndex((block: any) => block.id == action.payload.id)
            page.buildingBlocks[index] = action.payload

            state.page = page
            updatePage(page)
        },

        replaceBlock: (state, action: PayloadAction<any>) => {
            let page = state.page.type == "blank" ? state.page : state.innerPage
            page = JSON.parse(JSON.stringify(page))

            let index = page.buildingBlocks.findIndex((block: any) => block.id == action.payload.referenceBlock)
            page.buildingBlocks.splice(index, 1, action.payload.newBlock)

            state.page = page
            updatePage(page)
        },

        removeBlock: (state, action: PayloadAction<string>) => {
            let page = state.page.type == "blank" ? state.page : state.innerPage
            page = JSON.parse(JSON.stringify(page))
            page.buildingBlocks = page.buildingBlocks.filter((block: any) => block.id !== action.payload)

            state.page = page
            updatePage(page)
        },

        focusBlock: (state, action: PayloadAction<any>) => {
            state.activeBlock = action.payload
        },

        modeUpdated: (state, action: PayloadAction<any>) => {
            state.mode = action.payload
        }
    }
})

export const { pageUpdated, innerPageUpdated, modeUpdated, loadPage, insertBlock, updateBlock, removeBlock, replaceBlock, focusBlock, appendBlock } = pageSlice.actions


export default pageSlice.reducer