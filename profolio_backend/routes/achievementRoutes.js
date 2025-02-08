import express from "express";
import {
  getAchievement,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAchievement).post(protect, createAchievement);

router
  .route("/:id")
  .get(getAchievementById)
  .put(protect, updateAchievement)
  .delete(protect, deleteAchievement);

export default router;
