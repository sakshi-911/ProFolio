import express from "express";
import {
  createTeaching,
  getTeaching,
  getTeachingById,
  updateTeaching,
  deleteTeaching,
} from "../controllers/teachingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTeaching).post(protect, createTeaching);

router
  .route("/:id")
  .get(getTeachingById)
  .put(protect, updateTeaching)
  .delete(protect, deleteTeaching);

export default router;
