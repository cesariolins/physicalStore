"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchShops = void 0;
const db_1 = require("../services/db");
const getDistance_1 = require("./getDistance");
const searchShops = async (cep) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM lojas;`;
        db_1.db.all(query, async (err, rows) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                return reject({ status: 500, message: 'Erro ao consultar o banco de dados' });
            }
            if (!rows || rows.length === 0) {
                return reject({ status: 404, message: 'Nenhuma loja encontrada' });
            }
            const nearbyShops = [];
            for (const row of rows) {
                const shopDistance = await (0, getDistance_1.getDistance)(cep, row.cep);
                const distanceInKm = parseFloat(shopDistance?.replace(' km', '') || '0');
                if (distanceInKm <= 100) {
                    nearbyShops.push({ ...row, distance: shopDistance });
                }
            }
            if (nearbyShops.length === 0) {
                return reject({ status: 404, message: 'Nenhuma loja encontrada no raio de 100 km' });
            }
            resolve(nearbyShops);
        });
    });
};
exports.searchShops = searchShops;
