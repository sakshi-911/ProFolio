import express from "express";
import {
  createResearch,
  getResearch,
  getResearchById,
  updateResearch,
  deleteResearch,
} from "../controllers/ResearchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getResearch).post(protect, createResearch);

router
  .route("/:id")
  .get(getResearchById)
  .put(protect, updateResearch)
  .delete(protect, deleteResearch);

export default router;
