import { Router } from 'express';
import { userRoutes } from './user.routes';

const routes = Router();

// Define que todas as rotas de usuário vão começar com /users
routes.use('/users', userRoutes);

export { routes };