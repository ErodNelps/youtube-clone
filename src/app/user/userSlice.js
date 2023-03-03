import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  userProfile: {
    email: "",
    familyName: "",
    givenName: "",
    googleId: "",
    imageUrl: "",
    name: "Erod Nelps",
  },
  error: null,
};

export const fetchMyProfile = createAsyncThunk(
  "user/fetchMyProfile",
  async (data, api) => {
    try {
      const response = await data.profileObj;
      return response;
    } catch (err) {
      return api.rejectWithValue(err.response.data.error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchMyProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
    },
    [fetchMyProfile.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const selectUserProfile = (state) => state.user.userProfile;

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
