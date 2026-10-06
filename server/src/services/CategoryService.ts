import { prisma } from '../lib/prisma';

export class CategoryService {
  async createCategory(userId: string, name: string, type: string, icon?: string) {
    const category = await prisma.category.create({
      data: {
        userId,
        name,
        type, // "INCOME" ou "EXPENSE"
        icon,
      },
    });

    return category;
  }

  async listUserCategories(userId: string) {
    return await prisma.category.findMany({
      where: { userId },
    });
  }
}