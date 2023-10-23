import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.baseURL = "https://project-jorney.onrender.com/api";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/posts");

      console.log("data", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, thunkAPI) => {
    try {
      const { data } = await axios.post("/posts", post);
      return data;
    } catch (error) {
      console.error("Помилка при виконанні запиту:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data, thunkAPI) => {
    const { id, updatedData } = data;
    console.log("data", data);
    console.log("id", id);
    console.log("updatedData", updatedData);
    try {
      const { data } = await axios.patch(`posts/${id}`, updatedData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`posts/${id}`);
      console.log("id", id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk("posts/like", async (id, thunkAPI) => {
  try {
    const { data } = await axios.patch(`posts/${id}/like`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
