"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cepValidation = void 0;
const axios_1 = __importDefault(require("axios"));
const getCoordinates_1 = require("./getCoordinates");
const cepValidation = async (req, res) => {
    const cep = req.query.cep;
    if (!cep) {
        return res.status(400).json({ message: 'CEP é obrigatório' });
    }
    try {
        const response = await axios_1.default.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        if (data.erro) {
            return res.status(404).json({ message: 'CEP não encontrado' });
        }
        const address = `${data.logradouro}, ${data.localidade}, ${data.uf}`;
        const { latitude, longitude } = await (0, getCoordinates_1.getCoordinates)(address);
    }
    catch (error) {
        throw new Error('Erro ao captar latitude e longitude.');
    }
};
exports.cepValidation = cepValidation;
