import express from "express";
import {
  getPosts,
  createPost,
  apply,
  getAppliedPosts,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/:userId", getPosts);

router.get("/applied/:studentId", getAppliedPosts);

router.post("/create-post", createPost);

router.post("/apply", apply);

export default router;
