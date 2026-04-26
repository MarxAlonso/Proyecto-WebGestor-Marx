"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTaskType = exports.updateTaskType = exports.findAllTaskTypes = exports.createTaskType = exports.removeTask = exports.updateTask = exports.findOneTask = exports.findAllTasks = exports.createTask = void 0;
const taskService_1 = require("../services/taskService");
const tasksService = new taskService_1.TasksService();
const taskTypesService = new taskService_1.TaskTypesService();
// Tasks
const createTask = async (req, res) => {
    try {
        const result = await tasksService.create(req.body, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createTask = createTask;
const findAllTasks = async (req, res) => {
    try {
        const result = await tasksService.findAll(req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findAllTasks = findAllTasks;
const findOneTask = async (req, res) => {
    try {
        const result = await tasksService.findOne(req.params.id, req.user.userId);
        if (!result)
            return res.status(404).json({ message: 'Task not found' });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findOneTask = findOneTask;
const updateTask = async (req, res) => {
    try {
        const result = await tasksService.update(req.params.id, req.body, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateTask = updateTask;
const removeTask = async (req, res) => {
    try {
        const result = await tasksService.remove(req.params.id, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeTask = removeTask;
// Task Types
const createTaskType = async (req, res) => {
    try {
        const result = await taskTypesService.create(req.body, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createTaskType = createTaskType;
const findAllTaskTypes = async (req, res) => {
    try {
        const result = await taskTypesService.findAll(req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findAllTaskTypes = findAllTaskTypes;
const updateTaskType = async (req, res) => {
    try {
        const result = await taskTypesService.update(req.params.id, req.body, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateTaskType = updateTaskType;
const removeTaskType = async (req, res) => {
    try {
        const result = await taskTypesService.remove(req.params.id, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeTaskType = removeTaskType;
