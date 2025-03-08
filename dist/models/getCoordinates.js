"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../logger"));
const getCoordinates = async (address) => {
    try {
        const response = await axios_1.default.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,
                format: 'json',
                limit: 1,
            },
        });
        if (response.data.length === 0) {
            logger_1.default.error('Não foi possível obter as coordenadas do endereço.');
        }
        return {
            latitude: Number(response.data[0].lat),
            longitude: Number(response.data[0].lon),
        };
    }
    catch (error) {
        logger_1.default.error(`Erro ao tentar obter coordenadas do CEP, Encerrando aplicação.`);
        process.exit(1);
    }
};
exports.getCoordinates = getCoordinates;
