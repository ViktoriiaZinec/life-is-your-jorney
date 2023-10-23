import { createSlice } from "@reduxjs/toolkit";
import {
  addPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "./operations";

const initialState = {
  items: [],
  //   filter: "",
  isLoading: false,
  error: "",
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, handlePending)
      .addCase(getPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log(" state.isLoading", state.isLoading);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPosts.rejected, handleRejected)
      .addCase(addPost.pending, handlePending)
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addPost.rejected, handleRejected)
      .addCase(updatePost.pending, handlePending)
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const index = state.items.findIndex(
          (post) => post.id === updatedPost.id
        );

        if (index !== -1) {
          state.items[index] = updatedPost;
        }
        console.log("updatedPost", updatedPost);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePost.rejected, handleRejected)
      .addCase(deletePost.pending, handlePending)
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        console.log("state", state);
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deletePost.rejected, handleRejected)
      .addCase(likePost.pending, handleRejected)
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const updatedItems = state.items.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );

        state.items = updatedItems;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(likePost.rejected, handleRejected);
  },
});

export const postsReducer = postsSlice.reducer;
