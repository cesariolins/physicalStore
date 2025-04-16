"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MelhorEnvioService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let MelhorEnvioService = class MelhorEnvioService {
    async calcularFrete(cepOrigem, cepDestino) {
        try {
            const response = await axios_1.default.post('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', [
                {
                    from: { postal_code: cepOrigem },
                    to: { postal_code: cepDestino },
                    products: [
                        {
                            id: '1',
                            weight: 1,
                            width: 20,
                            height: 20,
                            length: 20,
                            quantity: 1,
                        },
                    ],
                },
            ], {
                headers: {
                    Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'physicalStore/1.0',
                },
            });
            if (!response.data || response.data.length === 0) {
                throw new common_1.HttpException('Não foi possível calcular o frete. Nenhuma opção retornada.', common_1.HttpStatus.BAD_REQUEST);
            }
            const frete = response.data[0];
            return `R$ ${Number(frete.price).toFixed(2)} (frete via ${frete.name})`;
        }
        catch (error) {
            console.error('Erro ao calcular frete com Melhor Envio:', error);
            throw new common_1.HttpException('Erro ao calcular frete com Melhor Envio.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MelhorEnvioService = MelhorEnvioService;
exports.MelhorEnvioService = MelhorEnvioService = __decorate([
    (0, common_1.Injectable)()
], MelhorEnvioService);
//# sourceMappingURL=melhor-envio.service.js.map