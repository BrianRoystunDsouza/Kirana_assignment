import express from "express";
import {
  getDetails,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getDetails);

export default router;
