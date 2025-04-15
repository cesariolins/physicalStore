import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetDistanceService } from './get-distance.service';
import { MelhorEnvioService } from './melhor-envio.service';

interface Shop {
  nome: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  cep: string;
  telefone: number;
  latitude: number;
  longitude: number;
}

@Injectable()
export class ShopsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly getDistanceService: GetDistanceService,
    private readonly melhorEnvioService: MelhorEnvioService,
  ) {}

  async getShopsByCep(
    cep: string,
  ): Promise<
    Array<Shop & { distance: string }> | { status: number; message: string }
  > {
    const rows = await this.databaseService.executeQuery<Shop>(
      'SELECT * FROM lojas;',
    );

    if (!rows || rows.length === 0) {
      return {
        status: 200,
        message: 'Nenhuma loja encontrada no banco de dados.',
      };
    }

    const nearbyShops: Array<Shop & { distance: number; frete: string }> = [];

    for (const row of rows) {
      const shopDistance = await this.getDistanceService.calculateDistance(
        cep,
        row.cep,
      );
      const distanceInKm = shopDistance / 1000;

      if (distanceInKm <= 100) {
        let frete: string;

        if (distanceInKm <= 50) {
          frete = 'R$ 15,00 (frete do PDV)';
        } else {
          frete = await this.melhorEnvioService.calcularFrete(row.cep, cep);
        }

        nearbyShops.push({ ...row, distance: distanceInKm, frete });
      }
    }

    if (nearbyShops.length === 0) {
      return {
        status: 200,
        message: 'Nenhuma loja encontrada no raio de 100 km.',
      };
    }

    nearbyShops.sort((a, b) => a.distance - b.distance);

    return nearbyShops.map((shop) => ({
      ...shop,
      distance: `${shop.distance.toFixed(2)} km`,
      frete: shop.frete,
    }));
  }
}
