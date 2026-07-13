import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js";
import connectDB from "./config/connectDb.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

connectDB();

app.get("/", (req, res) => {
    return res.send("hello world");
});
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
