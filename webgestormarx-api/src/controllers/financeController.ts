import { Request, Response } from 'express';
import { FinanceService } from '../services/financeService';

interface AuthRequest extends Request {
  user?: { userId: string };
}

const financeService = new FinanceService();

export const getSettings = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.getSettings(req.user!.userId);
    res.json(result);
  } catch (error: any) {
    console.error('Error in getSettings:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSavings = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.updateSavings(req.user!.userId, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addPayment = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.addPayment(req.user!.userId, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPayments = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.getPayments(req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePayment = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.deletePayment(req.params.id, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePayment = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.updatePayment(req.params.id, req.user!.userId, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addIncome = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.addIncome(req.user!.userId, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomes = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.getIncomes(req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIncome = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.updateIncome(req.params.id, req.user!.userId, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIncome = async (req: AuthRequest, res: Response) => {
  try {
    const result = await financeService.deleteIncome(req.params.id, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
