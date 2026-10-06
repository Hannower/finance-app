import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post('/', categoryController.create);
categoryRoutes.get('/user/:userId', categoryController.index);

export { categoryRoutes };