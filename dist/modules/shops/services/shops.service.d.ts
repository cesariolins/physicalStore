import { DatabaseService } from '../../database/database.service';
import { GetDistanceService } from './get-distance.service';
import { MelhorEnvioService } from './melhor-envio.service';
export interface Shop {
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
export declare class ShopsService {
  private readonly databaseService;
  private readonly getDistanceService;
  private readonly melhorEnvioService;
  constructor(
    databaseService: DatabaseService,
    getDistanceService: GetDistanceService,
    melhorEnvioService: MelhorEnvioService,
  );
  listAllShops(): Promise<Shop[]>;
  getShopsByCep(cep: string): Promise<
    | Array<
        Shop & {
          distance: string;
        }
      >
    | {
        status: number;
        message: string;
      }
  >;
}
