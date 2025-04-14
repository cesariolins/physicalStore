import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetDistanceService } from './get-distance.service';
import { CepValidationService } from './cep-validation.service';

@Injectable()
export class ShopsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly getDistanceService: GetDistanceService,
    private readonly cepValidationService: CepValidationService,
  ) {}

  async getShopsByCep(cep: string): Promise<any> {
    // Valida o CEP antes de buscar lojas
    const validCep = await this.cepValidationService.validateCep(cep);

    const rows = await this.databaseService.executeQuery(
      'SELECT * FROM lojas;',
    );
    if (!rows || rows.length === 0) {
      throw new HttpException('Nenhuma loja encontrada.', HttpStatus.NOT_FOUND);
    }

    const nearbyShops = [];
    for (const row of rows) {
      const shopDistance = await this.getDistanceService.calculateDistance(
        validCep.cep,
        row.cep,
      );
      const distanceInKm = shopDistance / 1000;
      if (distanceInKm <= 100) {
        nearbyShops.push({ ...row, distance: distanceInKm });
      }
    }

    nearbyShops.sort((a, b) => a.distance - b.distance);
    return nearbyShops.map((shop) => ({
      ...shop,
      distance: `${shop.distance.toFixed(2)} km`,
    }));
  }
}
