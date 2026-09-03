import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/connectDb.js";
import protectRoute from "./middlewares/protectRoute.js";
import { authRoute, userRoute } from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/user", protectRoute, userRoute);

export default app;
