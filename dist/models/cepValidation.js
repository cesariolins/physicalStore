"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cepValidation = void 0;
const axios_1 = __importDefault(require("axios"));
const getCoordinates_1 = require("./getCoordinates");
const db_1 = require("../services/db");
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
        const query = `
          SELECT *
          FROM (
            SELECT *,
            (6371 * acos(
              cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
              sin(radians(?)) * sin(radians(latitude))
            )) AS distance
            FROM lojas
          ) AS subquery
          WHERE distance <= 100
          ORDER BY distance ASC;
        `;
        db_1.db.all(query, [latitude, longitude, latitude], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
            }
            if (!rows || rows.length === 0) {
                return res.status(404).json({ message: 'Nenhuma loja encontrada no raio de 100 km' });
            }
            res.json(rows);
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao processar a requisição', error: error.message });
    }
};
exports.cepValidation = cepValidation;
