import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
const port = process.env.PORT || 5000;

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import path from "path";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => res.send("Server has started"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
