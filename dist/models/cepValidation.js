"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cepValidation = void 0;
const axios_1 = __importDefault(require("axios"));
const getCoordinates_1 = require("./getCoordinates");
const logger_1 = __importDefault(require("../logger"));
const cepValidation = async (cep) => {
    try {
        const response = await axios_1.default.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        if (data.erro) {
            logger_1.default.error(`não foi possível validar CEP.`);
        }
        const address = `${data.cep}`;
        const { latitude, longitude } = await (0, getCoordinates_1.getCoordinates)(address);
    }
    catch (error) {
        logger_1.default.error(`Erro ao capturar latitude e longitude: ${error}`);
    }
};
exports.cepValidation = cepValidation;
