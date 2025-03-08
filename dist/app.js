"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routerShops_1 = __importDefault(require("./routes/routerShops"));
const startDB_1 = require("./models/startDB");
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/busca", routerShops_1.default);
const PORT = process.env.PORT || 3000;
const startApp = async () => {
    try {
        await (0, startDB_1.startDB)();
        app.listen(PORT, () => logger_1.default.info(`Servidor rodando na porta ${PORT}`));
    }
    catch (error) {
        logger_1.default.error(`Erro ao processar a solicitação: ${error}`);
    }
};
startApp();
