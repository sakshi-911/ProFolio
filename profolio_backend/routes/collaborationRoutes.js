import express from "express";
import {
  createCollaboration,
  getCollaborations,
  getCollaborationById,
  updateCollaboration,
  deleteCollaboration,
} from "../controllers/collaborationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCollaborations).post(protect, createCollaboration);

router
  .route("/:id")
  .get(getCollaborationById)
  .put(protect, updateCollaboration)
  .delete(protect, deleteCollaboration);

export default router;
