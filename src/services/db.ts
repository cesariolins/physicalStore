import logger from "../logger";
import sqlite3 from "sqlite3"
require("dotenv").config()

const DATABASE_FILE = process.env.DATABASE_FILE

if (!DATABASE_FILE) {
    throw new Error('DATABASE_FILE não está definido no arquivo .env');
  }
    
export const db = new sqlite3.Database(DATABASE_FILE, (err) => {
    if (err) {
        logger.error(`Erro ao conectar banco de dados: ${err.message}`)
    } else {
        logger.info(`Conectado ao banco de dados.`)
    }
});

    