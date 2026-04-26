import { Request, Response } from 'express';
import { TasksService, TaskTypesService } from '../services/taskService';

interface AuthRequest extends Request {
  user?: { userId: string };
}

const tasksService = new TasksService();
const taskTypesService = new TaskTypesService();

// Tasks
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const result = await tasksService.create(req.body, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const findAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const result = await tasksService.findAll(req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const findOneTask = async (req: AuthRequest, res: Response) => {
  try {
    const result = await tasksService.findOne(req.params.id, req.user!.userId);
    if (!result) return res.status(404).json({ message: 'Task not found' });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const result = await tasksService.update(req.params.id, req.body, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeTask = async (req: AuthRequest, res: Response) => {
  try {
    const result = await tasksService.remove(req.params.id, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Task Types
export const createTaskType = async (req: AuthRequest, res: Response) => {
  try {
    const result = await taskTypesService.create(req.body, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const findAllTaskTypes = async (req: AuthRequest, res: Response) => {
  try {
    const result = await taskTypesService.findAll(req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskType = async (req: AuthRequest, res: Response) => {
  try {
    const result = await taskTypesService.update(req.params.id, req.body, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeTaskType = async (req: AuthRequest, res: Response) => {
  try {
    const result = await taskTypesService.remove(req.params.id, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
