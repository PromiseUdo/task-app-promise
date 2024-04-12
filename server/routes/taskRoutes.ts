import express from "express";
const router = express.Router();

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTasksByStage,
  updateTask,
} from "../controllers/taskController";

router.post("/", createTask);
router.get("/", getTasks);
router.get("/stage/:stage", getTasksByStage);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
