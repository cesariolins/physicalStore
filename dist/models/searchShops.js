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
                const distanceInKm = shopDistance / 1000;
                if (distanceInKm <= 100) {
                    nearbyShops.push({ ...row, distance: distanceInKm });
                }
            }
            if (nearbyShops.length === 0) {
                return reject({ status: 404, message: 'Nenhuma loja encontrada no raio de 100 km' });
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
