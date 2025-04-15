import { DatabaseService } from '../../database/database.service';
import { GetDistanceService } from './get-distance.service';
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
export declare class ShopsService {
  private readonly databaseService;
  private readonly getDistanceService;
  constructor(
    databaseService: DatabaseService,
    getDistanceService: GetDistanceService,
  );
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
export {};
