import express from "express";
import {
  getAwards,
  getAwardById,
  createAward,
  updateAward,
  deleteAward,
} from "../controllers/awardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAwards).post(protect, createAward);

router
  .route("/:id")
  .get(getAwardById)
  .put(protect, updateAward)
  .delete(protect, deleteAward);

export default router;
