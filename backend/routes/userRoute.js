import express from "express";
import { getUser, updateCompleted } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.post("/completed", updateCompleted);

export default router;
