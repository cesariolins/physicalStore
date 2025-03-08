"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchShops = void 0;
const db_1 = require("../services/db");
const getDistance_1 = require("./getDistance");
const logger_1 = __importDefault(require("../logger"));
const searchShops = async (cep) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM lojas;`;
        db_1.db.all(query, async (err, rows) => {
            if (err) {
                logger_1.default.error('Erro ao consultar o banco de dados:', err);
                return reject({ status: 500, message: 'Erro ao consultar o banco de dados.' });
            }
            if (!rows || rows.length === 0) {
                return resolve({ status: 200, message: 'Nenhuma loja encontrada no banco de dados.' });
            }
            const nearbyShops = [];
            for (const row of rows) {
                const shopDistance = await (0, getDistance_1.getDistance)(cep, row.cep);
                const distanceInKm = shopDistance / 1000;
                if (distanceInKm <= 100) {
                    nearbyShops.push({ ...row, distance: distanceInKm });
                }
            }
            if (nearbyShops.length === 0) {
                return resolve({ status: 200, message: 'Nenhuma loja encontrada no raio de 100 km.' });
            }
            nearbyShops.sort((a, b) => a.distance - b.distance);
            const updatedShops = nearbyShops.map(shop => ({
                ...shop,
                distance: `${shop.distance.toFixed(2)} km`
            }));
            resolve(updatedShops);
        });
    });
};
exports.searchShops = searchShops;
