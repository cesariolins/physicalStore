'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.GetCoordinatesService = void 0;
const common_1 = require('@nestjs/common');
const axios_1 = require('axios');
let GetCoordinatesService = class GetCoordinatesService {
  async fetchCoordinates(address) {
    try {
      const response = await axios_1.default.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: address,
            format: 'json',
            limit: 1,
          },
        },
      );
      if (response.data.length === 0) {
        throw new common_1.HttpException(
          'Não foi possível obter as coordenadas do endereço.',
          common_1.HttpStatus.NOT_FOUND,
        );
      }
      return {
        latitude: Number(response.data[0].lat),
        longitude: Number(response.data[0].lon),
      };
    } catch (error) {
      console.error(`Erro ao tentar obter coordenadas: ${error}`);
      throw new common_1.HttpException(
        'Erro ao tentar obter coordenadas.',
        common_1.HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
};
exports.GetCoordinatesService = GetCoordinatesService;
exports.GetCoordinatesService = GetCoordinatesService = __decorate(
  [(0, common_1.Injectable)()],
  GetCoordinatesService,
);
//# sourceMappingURL=get-coordinates.service.js.map
