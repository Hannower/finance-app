import { prisma } from '../lib/prisma';

export class AccountService {
    async createAccount(userId: string, name: string, type: string, balance?: number) {
        const account = await prisma.account.create({
            data: {
                userId,
                name,
                type, // Ex: "CHECKING", "SAVINGS", "CREDIT_CARD"
                balance: balance || 0.0,
            },
        });

        return account;
    }

    async listUserAccounts(userId: string) {
        return await prisma.account.findMany({
            where: { userId },
        });
    }
}