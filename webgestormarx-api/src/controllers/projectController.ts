import { Request, Response } from 'express';
import { ProjectsService } from '../services/projectService';

interface AuthRequest extends Request {
  user?: { userId: string };
}

const projectsService = new ProjectsService();

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const result = await projectsService.create(req.body, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    console.error('Error in findAll projects:', error);
    res.status(500).json({ message: error.message });
  }
};

export const findAll = async (req: AuthRequest, res: Response) => {
  try {
    const result = await projectsService.findAll(req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req: AuthRequest, res: Response) => {
  try {
    const result = await projectsService.findOne(req.params.id, req.user!.userId);
    if (!result) return res.status(404).json({ message: 'Project not found' });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const result = await projectsService.update(req.params.id, req.body, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const result = await projectsService.remove(req.params.id, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const enableShare = async (req: AuthRequest, res: Response) => {
  try {
    const result = await projectsService.enableShare(req.params.id, req.user!.userId);
    if (!result) return res.status(404).json({ message: 'Project not found' });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const findPublicBySlug = async (req: Request, res: Response) => {
  try {
    const result = await projectsService.findPublicBySlug(req.params.slug);
    if (!result) return res.status(404).json({ message: 'Project not found or not public' });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
