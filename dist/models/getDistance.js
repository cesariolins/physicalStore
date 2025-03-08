"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = void 0;
const axios_1 = __importDefault(require("axios"));
const getCoordinates_1 = require("./getCoordinates");
const logger_1 = __importDefault(require("../logger"));
const getDistance = async (originCep, destinationCep) => {
    try {
        const originCoordinates = await (0, getCoordinates_1.getCoordinates)(originCep);
        const destinationCoordinates = await (0, getCoordinates_1.getCoordinates)(destinationCep);
        const origin = `${originCoordinates.latitude},${originCoordinates.longitude}`;
        const destination = `${destinationCoordinates.latitude},${destinationCoordinates.longitude}`;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyCqiADoLKOS1GawgoLrgTtBKByDuXq7sCU`;
        const response = await axios_1.default.get(url);
        const data = response.data;
        if (data.routes.length > 0) {
            const route = data.routes[0];
            const distance = route.legs[0].distance.value;
            return distance;
        }
        else {
            logger_1.default.info("Nenhuma rota encontrada.");
        }
    }
    catch (error) {
        logger_1.default.error(`Erro ao obter direções.`);
    }
};
exports.getDistance = getDistance;
