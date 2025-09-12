import express from "express";
import {
  createPost,
  deletePost,
  getPaginatedPosts,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/paginated", getPaginatedPosts);
router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
