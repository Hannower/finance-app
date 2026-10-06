import { Router } from 'express';
import { userRoutes } from './user.routes';
import { accountRoutes } from './account.routes';
import { categoryRoutes } from './category.routes';
import { transactionRoutes } from './transaction.routes';
import { authRoutes } from './auth.routes';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

// Rotas públicas (não exigem token)
routes.use('/auth', authRoutes);
routes.use('/users', userRoutes); // Cadastro de usuário continua público

// Rotas privadas (exigem token JWT)
routes.use('/accounts', ensureAuthenticated, accountRoutes);
routes.use('/categories', ensureAuthenticated, categoryRoutes);
routes.use('/transactions', ensureAuthenticated, transactionRoutes);

export { routes };