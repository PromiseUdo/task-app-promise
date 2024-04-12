import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Task from "../models/taskModel";
import { getUser } from "./userController";

const createTask = expressAsyncHandler(async (req: Request, res: Response) => {
  const { id, title, description, dueDate, stage } = req.body;
  const task = await Task.create({
    title,
    description,
    dueDate,
    stage,
    user: id,
  });

  if (task) {
    res.status(201).json({
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      stage: task.stage,
    });
  } else {
    res.status(400);
    throw new Error("Invalid task data");
  }
});

const getTasks = expressAsyncHandler(async (req: Request, res: Response) => {
  const id = req.query.id;
  const tasks = await Task.find({ user: id });

  if (tasks.length > 0) {
    res.status(200).json(tasks);
  } else {
    res.status(404);
    throw new Error("No tasks found");
  }
});

const updateTask = expressAsyncHandler(async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { title, description, dueDate, stage } = req.body;
  console.log(title, description, dueDate, stage);
  const task = await Task.findById(taskId);

  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.stage = stage || task.stage;

    const updatedTask = await task.save();

    res.status(200).json({
      _id: updatedTask._id,
      title: updatedTask.title,
      description: updatedTask.description,
      dueDate: updatedTask.dueDate,
      stage: updatedTask.stage,
    });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});
const deleteTask = expressAsyncHandler(async (req: Request, res: Response) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  if (task) {
    await Task.deleteOne({ _id: taskId });
    res.status(200).json({ message: "Task deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

const getTaskById = expressAsyncHandler(async (req: Request, res: Response) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

const getTasksByStage = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.query.id;

    const stage = req.params.stage;

    console.log(stage, "stage");

    const tasks = await Task.find({ stage: stage, user: id });

    if (tasks.length > 0) {
      res.status(200).json(tasks);
    } else {
      res.status(404);
      throw new Error(`No tasks found with stage: ${stage}`);
    }
  }
);

export {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
  getTasksByStage,
};
