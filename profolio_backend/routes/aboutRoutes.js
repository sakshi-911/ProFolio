import express from "express";
import {
  upsertAbout,
  getAbout,
  deleteAbout,
} from "../controllers/aboutController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAbout)
  .post(protect, upsertAbout)
  .delete(protect, deleteAbout);

export default router;
