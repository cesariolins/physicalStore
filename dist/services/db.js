"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const logger_1 = __importDefault(require("../logger"));
const sqlite3_1 = __importDefault(require("sqlite3"));
require("dotenv").config();
const DATABASE_FILE = process.env.DATABASE_FILE;
if (!DATABASE_FILE) {
    throw new Error('DATABASE_FILE não está definido no arquivo .env');
}
exports.db = new sqlite3_1.default.Database(DATABASE_FILE, (err) => {
    if (err) {
        logger_1.default.error(`Erro ao conectar banco de dados: ${err.message}`);
    }
    else {
        logger_1.default.info(`Conectado ao banco de dados.`);
    }
});
