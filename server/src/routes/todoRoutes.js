import { Router } from 'express';
import {
  clearCompleted,
  createTodo,
  deleteTodo,
  getTodos,
  reorderTodos,
  updateTodo,
} from '../controllers/todoController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router();

router.use(authMiddleware);
router.get('/', catchAsync(getTodos));
router.post('/', catchAsync(createTodo));
router.put('/:id', catchAsync(updateTodo));
router.delete('/:id', catchAsync(deleteTodo));
router.delete('/completed/all', catchAsync(clearCompleted));
router.patch('/reorder', catchAsync(reorderTodos));

export default router;
