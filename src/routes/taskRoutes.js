import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
} from '../controllers/taskController.js';

const router = Router();


router.post('/', createTask);

router.get('/', getTasks);

router.patch('/:id/status', updateTaskStatus);

router.delete('/:id', deleteTask);

export default router;
