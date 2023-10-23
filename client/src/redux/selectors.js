// import { createSelector } from "@reduxjs/toolkit";

export const selectPosts = (state) => state.posts.items;

// export const selectIsLoading = (state) => state.posts.isLoadind;
export const selectIsLoading = (state) => {
  console.log("state in selectIsLoading", state);
  return state.posts.isLoading;
};
