import { Router } from 'express';
import * as projectController from '../controllers/projectController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Public route
router.get('/public/:slug', projectController.findPublicBySlug);
  router.get('/projects-public/:slug', projectController.findPublicBySlug);

// Protected routes
router.use(authenticateToken);
router.post('/', projectController.create);
router.get('/', projectController.findAll);
router.get('/:id', projectController.findOne);
  router.patch('/:id', projectController.update);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.remove);
router.post('/:id/share', projectController.enableShare);

export default router;
