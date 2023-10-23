import { Post } from "../models/post.js";

import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getPosts = async (req, res) => {
  const result = await Post.find();
  res.json(result);
};

const createPost = async (req, res) => {
  const result = await Post.create({ ...req.body });

  res.status(201).json(result);
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const existingPost = await Post.findById({ _id });
  console.log("existingPost", existingPost);
  if (!existingPost) {
    throw HttpError(404, "Not found");
  }

  const result = await Post.findByIdAndUpdate(_id, req.body, { new: true });
  console.log("result", result);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const result = await Post.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const likePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  const result = await Post.findByIdAndUpdate(
    id,
    {
      like: post.like + 1,
    },
    { new: true }
  );
  res.json(result);
};

export default {
  getPosts: ctrlWrapper(getPosts),
  createPost: ctrlWrapper(createPost),
  updatePost: ctrlWrapper(updatePost),
  deletePost: ctrlWrapper(deletePost),
  likePost: ctrlWrapper(likePost),
};
