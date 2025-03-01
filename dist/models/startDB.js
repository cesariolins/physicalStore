"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDB = void 0;
const db_1 = require("../services/db");
const startDB = async () => {
    return new Promise((resolve, reject) => {
        db_1.db.serialize(() => {
            db_1.db.run(`
          CREATE TABLE IF NOT EXISTS lojas (
            nome TEXT,
            rua TEXT,
            numero INTEGER,
            bairro TEXT,
            cidade TEXT,
            cep TEXT,
            telefone INTEGER
            latitude REAL,
            longitude REAL
          );
          `, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    });
};
exports.startDB = startDB;
