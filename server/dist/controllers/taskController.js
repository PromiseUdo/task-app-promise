"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksByStage = exports.getTaskById = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const createTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, description, dueDate, stage } = req.body;
    const task = yield taskModel_1.default.create({
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
    }
    else {
        res.status(400);
        throw new Error("Invalid task data");
    }
}));
exports.createTask = createTask;
const getTasks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const tasks = yield taskModel_1.default.find({ user: id });
    if (tasks.length > 0) {
        res.status(200).json(tasks);
    }
    else {
        res.status(404);
        throw new Error("No tasks found");
    }
}));
exports.getTasks = getTasks;
const updateTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const { title, description, dueDate, stage } = req.body;
    console.log(title, description, dueDate, stage);
    const task = yield taskModel_1.default.findById(taskId);
    if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.stage = stage || task.stage;
        const updatedTask = yield task.save();
        res.status(200).json({
            _id: updatedTask._id,
            title: updatedTask.title,
            description: updatedTask.description,
            dueDate: updatedTask.dueDate,
            stage: updatedTask.stage,
        });
    }
    else {
        res.status(404);
        throw new Error("Task not found");
    }
}));
exports.updateTask = updateTask;
const deleteTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const task = yield taskModel_1.default.findById(taskId);
    if (task) {
        yield taskModel_1.default.deleteOne({ _id: taskId });
        res.status(200).json({ message: "Task deleted successfully" });
    }
    else {
        res.status(404);
        throw new Error("Task not found");
    }
}));
exports.deleteTask = deleteTask;
const getTaskById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const task = yield taskModel_1.default.findById(taskId);
    if (task) {
        res.status(200).json(task);
    }
    else {
        res.status(404);
        throw new Error("Task not found");
    }
}));
exports.getTaskById = getTaskById;
const getTasksByStage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const stage = req.params.stage;
    console.log(stage, "stage");
    const tasks = yield taskModel_1.default.find({ stage: stage, user: id });
    if (tasks.length > 0) {
        res.status(200).json(tasks);
    }
    else {
        res.status(404);
        throw new Error(`No tasks found with stage: ${stage}`);
    }
}));
exports.getTasksByStage = getTasksByStage;
