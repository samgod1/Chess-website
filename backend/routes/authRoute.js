import express from "express";

import { Signup, Login, Guest } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/guest", Guest);

export default router;
