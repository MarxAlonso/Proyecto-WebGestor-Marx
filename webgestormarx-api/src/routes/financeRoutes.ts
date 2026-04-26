import { Router } from 'express';
import * as financeController from '../controllers/financeController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/settings', financeController.getSettings);
router.post('/savings', financeController.updateSavings);

router.get('/payments', financeController.getPayments);
router.post('/payments', financeController.addPayment);
router.put('/payments/:id', financeController.updatePayment);
router.delete('/payments/:id', financeController.deletePayment);

router.get('/income', financeController.getIncomes);
router.post('/income', financeController.addIncome);
router.put('/income/:id', financeController.updateIncome);
router.delete('/income/:id', financeController.deleteIncome);

export default router;
