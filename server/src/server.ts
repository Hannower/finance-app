// 1. Importações
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';

// 2. Carrega variáveis do .env
dotenv.config();

// 3. Cria o servidor
const app = express();

// 4. Configura middlewares
app.use(cors());
app.use(express.json());

// 5. Registra as rotas da API
app.use('/api', routes);

// 6. Rota para testar se o servidor está funcionando
app.get('/health', (req, res) => {
    return res.json({
        status: 'ok',
        message: 'Backend rodando com sucesso!'
    });
});

// 7. Define a porta
const PORT = process.env.PORT || 3333;

// 8. Liga o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});