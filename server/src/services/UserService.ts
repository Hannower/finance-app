import { prisma } from '../lib/prisma';

export class UserService {
  async createUser(name: string, email: string, password: string) {
    // 1. Verifica se o e-mail já está cadastrado
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('Usuário já cadastrado com este e-mail.');
    }

    // 2. Salva o novo usuário no PostgreSQL via Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }

  async listUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}