import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

export class UserService {
  async createUser(name: string, email: string, password: string) {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('Usuário já cadastrado com este e-mail.');
    }

    // Gera o hash da senha com salt de 8
    const passwordHash = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
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