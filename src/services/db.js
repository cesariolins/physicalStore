const sqlite3 = require("sqlite3")
require("dotenv").config()

const DATABASE_FILE = process.env.DATABASE_FILE

const openConnection = () => {
    let db = new sqlite3.Database(DATABASE_FILE, (err) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err.message)
        } else {
            console.log("Conexão bem-sucedida com o banco de dados")
        }
    });
    return db
}

module.exports = {
    openConnection
}
    