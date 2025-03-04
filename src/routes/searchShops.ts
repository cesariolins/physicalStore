import express from 'express';
import { cepValidation } from '../models/cepValidation';
import { searchShops } from '../models/searchShops';

const router = express.Router();

router.get('/lojas', async (req, res, next) => {
    try {
        // Validar o CEP antes de prosseguir
        await cepValidation(req, res);
        
        const cep = req.query.cep as string;
        if (!cep) {
            return res.status(400).json({ message: 'CEP é obrigatório' });
        }

        // Buscar as lojas próximas
        const shops = await searchShops(cep);
        
        res.status(200).json(shops);
    } catch (error: any) {
        next(error); // Passa o erro para o middleware de erro do Express
    }
});

export default router;
