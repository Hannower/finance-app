import { prisma } from '../lib/prisma';

interface CreateTransactionDTO {
    userId: string;
    accountId: string;
    categoryId: string;
    description: string;
    amount: number;
    date: Date;
    dueDate?: Date;
    status?: string; // "PAID" ou "PENDING"
    type: string;    // "INCOME" ou "EXPENSE"
}

export class TransactionService {
    async createTransaction(data: CreateTransactionDTO) {
        const transaction = await prisma.transaction.create({
            data: {
                userId: data.userId,
                accountId: data.accountId,
                categoryId: data.categoryId,
                description: data.description,
                amount: data.amount,
                date: data.date,
                dueDate: data.dueDate,
                status: data.status || 'PENDING',
                type: data.type,
            },
            include: {
                account: true,
                category: true,
            },
        });

        // Se a transação for criada já como PAGA (PAID), atualizamos o saldo da conta automaticamente
        if (transaction.status === 'PAID') {
            const amountChange = transaction.type === 'INCOME' ? Number(data.amount) : -Number(data.amount);

            await prisma.account.update({
                where: { id: data.accountId },
                data: {
                    balance: {
                        increment: amountChange,
                    },
                },
            });
        }

        return transaction;
    }

    async listUserTransactions(userId: string) {
        return await prisma.transaction.findMany({
            where: { userId },
            include: {
                account: {
                    select: { name: true, type: true },
                },
                category: {
                    select: { name: true, icon: true },
                },
            },
            orderBy: {
                date: 'desc',
            },
        });
    }

    async deleteTransaction(transactionId: string) {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
        });

        if (!transaction) {
            throw new Error('Transação não encontrada.');
        }

        // Se a transação foi paga, estornamos o valor na conta
        if (transaction.status === 'PAID') {
            const amountReversal = transaction.type === 'INCOME'
                ? -Number(transaction.amount)
                : Number(transaction.amount);

            await prisma.account.update({
                where: { id: transaction.accountId },
                data: {
                    balance: {
                        increment: amountReversal,
                    },
                },
            });
        }

        await prisma.transaction.delete({
            where: { id: transactionId },
        });

        return { message: 'Transação excluída com sucesso.' };
    }
}