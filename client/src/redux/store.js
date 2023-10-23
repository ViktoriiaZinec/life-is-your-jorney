import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postsReducers";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
export default store;
