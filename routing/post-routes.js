import { Router } from "express";
import {
  addPost,
  getAllPosts,
  getPostById,
} from "../controllers/Post-controller";

const postRouter = Router();
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", addPost);

export default postRouter;
