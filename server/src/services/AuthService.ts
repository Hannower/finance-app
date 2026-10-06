import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

interface LoginDTO {
    email: string;
    password: string;
}

export class AuthService {
    async execute({ email, password }: LoginDTO) {
        // 1. Verificar se o utilizador existe
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('E-mail ou senha incorretos.');
        }

        // 2. Comparar a senha enviada com a senha hash salva no banco
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('E-mail ou senha incorretos.');
        }

        // 3. Gerar o Token JWT
        const secret = process.env.JWT_SECRET || 'default_secret';

        const token = jwt.sign(
            { name: user.name, email: user.email },
            secret,
            {
                subject: user.id,
                expiresIn: '1d', // Token expira em 1 dia
            }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        };
    }
}