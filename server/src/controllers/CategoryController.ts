import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

const categoryService = new CategoryService();

export class CategoryController {
    async create(req: Request, res: Response) {
        try {
            const { userId, name, type, icon } = req.body;

            if (!userId || !name || !type) {
                return res.status(400).json({ error: 'userId, name e type são obrigatórios.' });
            }

            const category = await categoryService.createCategory(userId, name, type, icon);
            return res.status(201).json(category);
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

            const categories = await categoryService.listUserCategories(userId);
            return res.json(categories);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro ao buscar categorias.' });
        }
    }
}