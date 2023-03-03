import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { channelAPI } from "api";
import paths from "configs/paths";
import localStorageKeys from "../../configs/localStorageKeys";

const initialState = {
  accessToken: localStorage.getItem(localStorageKeys.TOKEN) || null,
  isValidAuthentication: false,
  isValidating: false,
  error: null,
};

export const login = createAsyncThunk("authen/login", async (data) => {
  const response = await data.token;
  return response;
});

export const checkTokenStatus = createAsyncThunk(
  "authen/checkTokenStatus",
  async (data, api) => {
    try {
      let params = { part: "snippet" };
      const response = await channelAPI.getMyChannel(params);
      return response.data;
    } catch (error) {
      return api.rejectWithValue(error);
    }
  }
);

export const authenSlice = createSlice({
  name: "authen",
  initialState: initialState,
  reducers: {
    verifyAuthentication(state) {
      if (localStorage.getItem(localStorageKeys.TOKEN)) {
        state.isValidAuthentication = true;
      } else {
        state.isValidAuthentication = false;
      }
    },
    logout: (state) => {
      localStorage.removeItem(localStorageKeys.TOKEN);
      state.isValidAuthentication = false;
      state.accessToken = null;
      window.location.href = paths.LOGIN;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      localStorage.setItem(localStorageKeys.TOKEN, action.payload);
      state.accessToken = action.payload;
      state.isValidAuthentication = true;
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [checkTokenStatus.fulfilled]: (state) => {
      state.isValidAuthentication = true;
    },
    [checkTokenStatus.rejected]: (state, action) => {
      state.isValidAuthentication = false;
      localStorage.removeItem(localStorageKeys.TOKEN);
      state.error = action.payload;
    },
  },
});

export const { selectValidAuthentication } = (state) =>
  state.authen.isValidAuthentication;

export const authenAction = authenSlice.actions;
export const authenReducer = authenSlice.reducer;
