"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDistanceService = void 0;
const common_1 = require("@nestjs/common");
const get_coordinates_service_1 = require("./get-coordinates.service");
const axios_1 = require("axios");
let GetDistanceService = class GetDistanceService {
    getCoordinatesService;
    constructor(getCoordinatesService) {
        this.getCoordinatesService = getCoordinatesService;
    }
    async calculateDistance(originCep, destinationCep) {
        try {
            const originCoordinates = await this.getCoordinatesService.fetchCoordinates(originCep);
            const destinationCoordinates = await this.getCoordinatesService.fetchCoordinates(destinationCep);
            const origin = `${originCoordinates.latitude},${originCoordinates.longitude}`;
            const destination = `${destinationCoordinates.latitude},${destinationCoordinates.longitude}`;
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.KEY_GOOGLE}`;
            const response = await axios_1.default.get(url);
            const data = response.data;
            if (data.routes.length > 0) {
                const route = data.routes[0];
                const distance = route.legs[0].distance.value;
                return distance;
            }
            else {
                throw new common_1.HttpException('Nenhuma rota encontrada.', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            console.error(`Erro ao calcular a distância: ${error}`);
            throw new common_1.HttpException('Erro ao calcular a distância.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.GetDistanceService = GetDistanceService;
exports.GetDistanceService = GetDistanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [get_coordinates_service_1.GetCoordinatesService])
], GetDistanceService);
//# sourceMappingURL=get-distance.service.js.map