import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const postSchema = new Schema(
  {
    user: {
      type: String,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    tags: {
      type: [String],
    },
    selectedFile: {
      type: String,
    },
    like: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { versionKey: false, timestamps: true }
);

postSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  user: Joi.string().required(),
  title: Joi.string().required(),
  message: Joi.string().required(),
  tags: Joi.array().required(),
  selectedFile: Joi.string().required(),
  like: Joi.number(),
});

const schemas = {
  addSchema,
};

const Post = model("post", postSchema);

export { schemas, Post };
