import { Router } from 'express';
import * as hobbyController from '../controllers/hobbyController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.post('/', hobbyController.create);
router.get('/', hobbyController.findAll);
router.get('/:id', hobbyController.findOne);
router.post('/:id/log', hobbyController.logActivity);
router.put('/:id', hobbyController.update);
router.delete('/:id', hobbyController.remove);

export default router;
