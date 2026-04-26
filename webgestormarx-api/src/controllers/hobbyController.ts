import { Request, Response } from 'express';
import { HobbiesService } from '../services/hobbyService';

interface AuthRequest extends Request {
  user?: { userId: string };
}

const hobbiesService = new HobbiesService();

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const result = await hobbiesService.create(req.user!.userId, req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error in findAll hobbies:', error);
    res.status(500).json({ message: error.message });
  }
};

export const findAll = async (req: AuthRequest, res: Response) => {
  try {
    const result = await hobbiesService.findAll(req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req: AuthRequest, res: Response) => {
  try {
    const result = await hobbiesService.findOne(req.params.id, req.user!.userId);
    if (!result) return res.status(404).json({ message: 'Hobby not found' });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logActivity = async (req: AuthRequest, res: Response) => {
  try {
    const result = await hobbiesService.logActivity(req.params.id, req.user!.userId, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const result = await hobbiesService.update(req.params.id, req.user!.userId, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const result = await hobbiesService.delete(req.params.id, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
