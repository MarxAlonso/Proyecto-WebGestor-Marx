import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.validateUser(email, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const result = await authService.login(user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
