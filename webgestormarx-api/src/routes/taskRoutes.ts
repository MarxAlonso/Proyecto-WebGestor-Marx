import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

// Tasks
router.post('/', taskController.createTask);
router.get('/', taskController.findAllTasks);
router.get('/:id', taskController.findOneTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.removeTask);

// Task Types
router.post('/types', taskController.createTaskType);
router.get('/types', taskController.findAllTaskTypes);
router.put('/types/:id', taskController.updateTaskType);
router.delete('/types/:id', taskController.removeTaskType);

export default router;
