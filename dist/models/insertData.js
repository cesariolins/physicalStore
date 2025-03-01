"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = void 0;
const db_1 = require("../services/db");
const lojas = [];
const insertData = async () => {
    return new Promise((resolve, reject) => {
        db_1.db.get('SELECT COUNT(*) as count FROM lojas', (err, row) => {
            if (err) {
                return reject(err);
            }
            if (row === undefined) {
                return reject(new Error('Nenhum resultado retornado do banco de dados.'));
            }
            if (row.count === 0) {
                const stmt = db_1.db.prepare('INSERT INTO lojas (nome, rua, numero, bairro, cidade, cep, telefone, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
                lojas.forEach((loja) => {
                    stmt.run(loja.nome, loja.rua, loja.numero, loja.bairro, loja.cidade, loja.cep, loja.telefone, loja.latitude, loja.longitude);
                });
                stmt.finalize((err) => {
                    if (err)
                        reject(err);
                    else {
                        console.log('Dados inseridos no banco de dados.');
                        resolve();
                    }
                });
            }
            else {
                console.log('Dados já existem no banco de dados.');
                resolve();
            }
        });
    });
};
exports.insertData = insertData;
