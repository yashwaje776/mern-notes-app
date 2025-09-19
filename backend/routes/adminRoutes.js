import express from "express";
import { getAllUsers, getAllNotes, deleteNoteByAdmin } from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/notes", protect, adminOnly, getAllNotes);
router.delete("/notes/:id", protect, adminOnly, deleteNoteByAdmin);

export default router;
