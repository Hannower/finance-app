import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const transactionRoutes = Router();
const transactionController = new TransactionController();

transactionRoutes.post('/', transactionController.create);
transactionRoutes.get('/user/:userId', transactionController.index);
transactionRoutes.delete('/:id', transactionController.delete);

export { transactionRoutes };