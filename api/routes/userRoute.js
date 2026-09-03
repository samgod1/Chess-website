import express from "express";
import {
    getUser,
    updateCompleted,
    updateBestScore,
    updatePuzzleLevel,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.post("/completed", updateCompleted);
router.post("/best", updateBestScore);
router.post("/puzzleLevel", updatePuzzleLevel);

export default router;
