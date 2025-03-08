"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cepValidation_1 = require("../models/cepValidation");
const searchShops_1 = require("../models/searchShops");
const logger_1 = __importDefault(require("../logger"));
const router = express_1.default.Router();
router.get('/lojas', async (req, res, next) => {
    const cep = req.query.cep;
    if (!cep) {
        logger_1.default.warn('CEP não fornecido na solicitação');
        res.status(400).json({ message: 'CEP é obrigatório' });
    }
    try {
        logger_1.default.info(`Validando CEP: ${cep}`);
        await (0, cepValidation_1.cepValidation)(cep);
        logger_1.default.info(`Buscando lojas próximas ao CEP: ${cep}`);
        const shops = await (0, searchShops_1.searchShops)(cep);
        logger_1.default.info(JSON.stringify(shops, null, 2));
        res.status(200).json(shops);
    }
    catch (error) {
        logger_1.default.error(`Erro ao processar a solicitação: ${error.message}`);
        next(error);
        res.status(404).json({ message: error.message });
    }
});
exports.default = router;
