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
exports.ShopsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const get_distance_service_1 = require("./get-distance.service");
const melhor_envio_service_1 = require("./melhor-envio.service");
let ShopsService = class ShopsService {
    databaseService;
    getDistanceService;
    melhorEnvioService;
    constructor(databaseService, getDistanceService, melhorEnvioService) {
        this.databaseService = databaseService;
        this.getDistanceService = getDistanceService;
        this.melhorEnvioService = melhorEnvioService;
    }
    async getShopsByCep(cep) {
        const rows = await this.databaseService.executeQuery('SELECT * FROM lojas;');
        if (!rows || rows.length === 0) {
            return {
                status: 200,
                message: 'Nenhuma loja encontrada no banco de dados.',
            };
        }
        const nearbyShops = [];
        for (const row of rows) {
            const shopDistance = await this.getDistanceService.calculateDistance(cep, row.cep);
            const distanceInKm = shopDistance / 1000;
            let frete;
            if (distanceInKm <= 50) {
                frete = 'R$ 15,00 (frete do próprio PDV)';
            }
            else {
                try {
                    frete = await this.melhorEnvioService.calcularFrete(row.cep, cep);
                }
                catch (error) {
                    console.error('Erro ao calcular frete via Melhor Envio:', error);
                    frete = 'Erro ao calcular frete via Melhor Envio';
                }
            }
            nearbyShops.push({ ...row, distance: distanceInKm, frete });
        }
        nearbyShops.sort((a, b) => a.distance - b.distance);
        return nearbyShops.map((shop) => ({
            ...shop,
            distance: `${shop.distance.toFixed(2)} km`,
            frete: shop.frete,
        }));
    }
};
exports.ShopsService = ShopsService;
exports.ShopsService = ShopsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        get_distance_service_1.GetDistanceService,
        melhor_envio_service_1.MelhorEnvioService])
], ShopsService);
//# sourceMappingURL=shops.service.js.map