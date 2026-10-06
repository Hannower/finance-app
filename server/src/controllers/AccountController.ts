import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';

const accountService = new AccountService();

export class AccountController {
    async create(req: Request, res: Response) {
        try {
            const { userId, name, type, balance } = req.body;

            if (!userId || !name || !type) {
                return res.status(400).json({ error: 'userId, name e type são obrigatórios.' });
            }

            const account = await accountService.createAccount(userId, name, type, balance);
            return res.status(201).json(account);
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

            const accounts = await accountService.listUserAccounts(userId);
            return res.json(accounts);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro ao buscar contas.' });
        }
    }
}