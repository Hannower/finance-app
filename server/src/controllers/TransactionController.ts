import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

const transactionService = new TransactionService();

export class TransactionController {
    async create(req: Request, res: Response) {
        try {
            const { userId, accountId, categoryId, description, amount, date, dueDate, status, type } = req.body;

            if (!userId || !accountId || !categoryId || !description || !amount || !date || !type) {
                return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
            }

            const transaction = await transactionService.createTransaction({
                userId,
                accountId,
                categoryId,
                description,
                amount: Number(amount),
                date: new Date(date),
                dueDate: dueDate ? new Date(dueDate) : undefined,
                status,
                type,
            });

            return res.status(201).json(transaction);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async index(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ error: 'userId é obrigatório.' });
            }

            const transactions = await transactionService.listUserTransactions(userId);
            return res.json(transactions);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro ao buscar transações.' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'ID da transação é obrigatório.' });
            }

            const result = await transactionService.deleteTransaction(id);
            return res.json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}