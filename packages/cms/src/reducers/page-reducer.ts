import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPage } from "../api/page";
import { addBlock } from "../util/traversals/add-block";
import { deleteBlock } from "../util/traversals/delete-block";
import { pushBlock } from "../util/traversals/push-block";
import { replaceBlock } from "../util/traversals/replace-block";

interface PageState {
  modified: any;
  rootPage: any;
  activePage: any;
  mode: string;
  activeBlock: string | null;
  pages: any[];
  currentCarouselPage: number | null;
  activePlayer: string | null;
  selected: string | null;
  expandedPages: string[];
}

let initialState: PageState = {
  modified: null,
  rootPage: null,
  activePage: null,
  mode: "visiting",
  activeBlock: null,
  pages: [],
  currentCarouselPage: null,
  activePlayer: null,
  selected: null,
  expandedPages: [],
};

export const fetchPage = createAsyncThunk("loadPage", async (id: string) => {
  return await getPage(id);
});

export const pageSlice = createSlice({
  name: "page",
  initialState,

  reducers: {
    rootPageUpdated: (state, action: PayloadAction<any>) => {
      state.rootPage = action.payload;

      // refresh rootPage inside pages
      if (state.rootPage) {
        let index = state.pages.findIndex(
          (p: any) => p.id == action.payload.id
        );
        state.pages.splice(index, 1, action.payload);
      }
    },

    pageUpdated: (state, action: PayloadAction<any>) => {
      state.activePage = action.payload;

      // highlight and expand node in the tree
      if (state.activePage && state.mode == "editing") {
        state.expandedPages.push(action.payload);

        if (state.activePage.type == "blank") {
          state.selected = state.activePage.id;
        }

        if (
          state.activePage.type == "carousel" &&
          state.currentCarouselPage == null
        ) {
          state.selected = state.activePage.config.pages[0].id;
        }
      }
    },

    pageCollapsed: (state, action: PayloadAction<any>) => {
      state.expandedPages = state.expandedPages.filter(
        (node: any) => node !== action.payload
      );
    },

    pageExpanded: (state, action: PayloadAction<any>) => {
      state.expandedPages.push(action.payload);
    },

    insertBlock: (state, action: PayloadAction<any>) => {
      let page = JSON.parse(JSON.stringify(state.activePage));
      state.activePage = addBlock(page, action.payload);
      state.modified = Date.now();
    },

    appendBlock: (state, action: PayloadAction<any>) => {
      let page = JSON.parse(JSON.stringify(state.activePage));
      state.activePage = pushBlock(page, action.payload);
      state.modified = Date.now();
    },

    updateBlock: (state, action: PayloadAction<any>) => {
      let page = JSON.parse(JSON.stringify(state.activePage));
      state.activePage = replaceBlock(page, action.payload);
      state.modified = Date.now();
    },

    removeBlock: (state, action: PayloadAction<string>) => {
      let page = JSON.parse(JSON.stringify(state.activePage));
      state.activePage = deleteBlock(page, action.payload);
      state.modified = Date.now();
    },

    focusBlock: (state, action: PayloadAction<any>) => {
      state.activeBlock = action.payload;
    },

    modeUpdated: (state, action: PayloadAction<any>) => {
      state.mode = action.payload;
    },

    pagesUpdated: (state, action: PayloadAction<any>) => {
      state.pages = action.payload;
    },

    carouselPageSwitched: (state, action: PayloadAction<any>) => {
      state.currentCarouselPage = action.payload;
      state.selected = action.payload;
    },

    activePlayerUpdated: (state, action: PayloadAction<any>) => {
      state.activePlayer = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.rootPage = action.payload;
      state.activePage = action.payload;
    });
  },
});

export const {
  pageCollapsed,
  pageExpanded,
  rootPageUpdated,
  pageUpdated,
  modeUpdated,
  insertBlock,
  removeBlock,
  updateBlock,
  appendBlock,
  focusBlock,
  pagesUpdated,
  carouselPageSwitched,
  activePlayerUpdated,
} = pageSlice.actions;

export default pageSlice.reducer;
