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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ShopsController = void 0;
const common_1 = require('@nestjs/common');
const shops_service_1 = require('../services/shops.service');
let ShopsController = class ShopsController {
  shopsService;
  constructor(shopsService) {
    this.shopsService = shopsService;
  }
  async getNearbyShops(cep) {
    if (!cep) {
      throw new common_1.HttpException(
        'CEP é obrigatório',
        common_1.HttpStatus.BAD_REQUEST,
      );
    }
    return await this.shopsService.getShopsByCep(cep);
  }
  async listAll() {
    return await this.shopsService.listAllShops();
  }
};
exports.ShopsController = ShopsController;
__decorate(
  [
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('cep')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  ShopsController.prototype,
  'getNearbyShops',
  null,
);
__decorate(
  [
    (0, common_1.Get)('listAll'),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  ShopsController.prototype,
  'listAll',
  null,
);
exports.ShopsController = ShopsController = __decorate(
  [
    (0, common_1.Controller)('shops'),
    __metadata('design:paramtypes', [shops_service_1.ShopsService]),
  ],
  ShopsController,
);
//# sourceMappingURL=shops.controller.js.map
