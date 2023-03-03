import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchQuery: "",
  searchFilters: [],
  error: null,
};

//export const updateSearchParams = createAsyncThunk(
//  "search/updateSearchParams",
//  async (data, api) => {
//    try {
//      const response = await data.profileObj;
//      return response;
//    } catch (err) {
//      return api.rejectWithValue(err.response.data.error);
//    }
//  }
//);

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    updateSearchParams: (state, action) => {
      state.searchFilters = [...state.searchFilters, action.payload.value];
    },
  },
  extraReducers: {
    //[updateSearchParams.fulfilled]: (state, action) => {
    //  state.userProfile = action.payload;
    //},
    //[updateSearchParams.rejected]: (state, action) => {
    //  state.error = action.payload;
    //},
  },
});

export const selectSearchFilters = (state) => state.search.searchFilters;
export const selectSearchQuery = (state) => state.search.searchQuery;

export const searchAction = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
