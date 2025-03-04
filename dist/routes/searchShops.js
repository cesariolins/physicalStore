"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cepValidation_1 = require("../models/cepValidation");
const searchShops_1 = require("../models/searchShops");
const router = express_1.default.Router();
router.get('/lojas', async (req, res, next) => {
    const cep = req.query.cep;
    if (!cep) {
        res.status(400).json({ message: 'CEP é obrigatório' });
        return;
    }
    try {
        await (0, cepValidation_1.cepValidation)(cep);
        const shops = await (0, searchShops_1.searchShops)(cep);
        res.status(200).json(shops);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
