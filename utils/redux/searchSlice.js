import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_OPTIONS, IMDB_API } from "../constants";

const initialState = {
  showSearch: false,
  searchLoading: false,
  page: 1,
  total_pages: 1,
  searchResults: [],
  searchText: "",
};

export const searchApiCall = createAsyncThunk(
  "searchApiCall",
  async (data, { getState, rejectWithValue }) => {
    const state = getState();
    let { name, page, firstRender } = data;
    console.log(state.searchSlice.total_pages);
    try {
      if (page > state.searchSlice.total_pages) {
        throw new Error("Pages are finished");
      }
      const response = await fetch(
        `${IMDB_API}/3/search/movie?query=${name}&include_adult=false&language=en-US&page=${page}`,
        API_OPTIONS
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);
      return { ...data, firstRender };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    toggleSearchView: (state, action) => {
      state.showSearch = !state.showSearch;
    },
    homeView: (state, action) => {
      state.showSearch = false;
    },
    changeSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearSearchResults: (state, action) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchApiCall.pending, (state, action) => {
      state.searchLoading = true;
    });
    builder.addCase(searchApiCall.fulfilled, (state, action) => {
      if (action.payload.firstRender) {
        state.searchResults = action.payload.results;
      } else
        state.searchResults = [
          ...state.searchResults,
          ...action.payload.results,
        ];
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.searchLoading = false;
    });
    builder.addCase(searchApiCall.rejected, (state, action) => {
      state.searchLoading = false;
      // state.searchResults = [];
    });
  },
});

export const {
  toggleSearchView,
  changeSearchText,
  clearSearchResults,
  homeView,
} = searchSlice.actions;

export default searchSlice.reducer;
