import { Router } from 'express';
import { userRoutes } from './user.routes';
import { accountRoutes } from './account.routes';
import { categoryRoutes } from './category.routes';
import { transactionRoutes } from './transaction.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/accounts', accountRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/transactions', transactionRoutes);

export { routes };