import express from "express";
import {
    getUser,
    updateCompleted,
    updateBestScore,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.post("/completed", updateCompleted);
router.post("/best", updateBestScore);

export default router;
