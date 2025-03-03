"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const searchShops_1 = __importDefault(require("./routes/searchShops"));
const startDB_1 = require("./models/startDB");
const insertData_1 = require("./models/insertData");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/busca", searchShops_1.default);
const PORT = process.env.PORT || 3000;
const startApp = async () => {
    try {
        await (0, startDB_1.startDB)();
        await (0, insertData_1.insertData)();
        app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));
    }
    catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
};
startApp();
