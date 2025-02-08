import express from "express";
import {
  createConference,
  getConferences,
  getConferenceById,
  updateConference,
  deleteConference,
} from "../controllers/conferenceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getConferences).post(protect, createConference);

router
  .route("/:id")
  .get(getConferenceById)
  .put(protect, updateConference)
  .delete(protect, deleteConference);

export default router;
