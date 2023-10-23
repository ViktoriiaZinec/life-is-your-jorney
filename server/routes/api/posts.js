import express from "express";

import ctrl from "../../controllers/posts.js";
import { schemas } from "../../models/post.js";

import { validateBody } from "../../middlewares/validateBody.js";

const router = express.Router();

router.get("/", ctrl.getPosts);

router.post("/", validateBody(schemas.addSchema), ctrl.createPost);

router.patch("/:id", ctrl.updatePost);

router.delete("/:id", ctrl.deletePost);

router.patch("/:id/like", ctrl.likePost);

export default router;
