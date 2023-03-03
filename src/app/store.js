import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "app/user/userSlice";
import { authenReducer } from "./authen/authenSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { searchReducer } from "app/search/searchSilce";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["userProfile"],
};

const persistedReducer = combineReducers({
  authen: authenReducer,
  user: persistReducer(userPersistConfig, userReducer),
  search: searchReducer,
});

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
