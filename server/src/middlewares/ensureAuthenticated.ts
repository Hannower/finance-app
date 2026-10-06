import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token JWT não fornecido.' });
    }

    // O cabeçalho vem no formato "Bearer <TOKEN>"
    const [, token] = authHeader.split(' ');

    try {
        const secret = process.env.JWT_SECRET || 'default_secret';
        const decoded = jwt.verify(token, secret) as TokenPayload;

        // Guarda o ID do utilizador autenticado dentro da requisição para uso nos controllers
        req.user = {
            id: decoded.sub,
        };

        return next(); // Libera a requisição para continuar para a rota
    } catch (err) {
        return res.status(401).json({ error: 'Token JWT inválido ou expirado.' });
    }
}