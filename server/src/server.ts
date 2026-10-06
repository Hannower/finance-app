import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Cadastra as rotas com o prefixo /api
app.use('/api', routes);

// Rota de teste simples
app.get('/health', (req, res) => {
  return res.json({ status: 'ok', message: 'Backend rodando com sucesso!' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});