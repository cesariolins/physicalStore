"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
require("dotenv").config();
const DATABASE_FILE = process.env.DATABASE_FILE;
if (!DATABASE_FILE) {
    throw new Error('DATABASE_FILE não está definido no arquivo .env');
}
exports.db = new sqlite3_1.default.Database(DATABASE_FILE, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    }
    else {
        console.log("Conectado com o banco de dados");
    }
});
