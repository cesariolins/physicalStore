import { ShopsService } from '../services/shops.service';
import { Shop } from '../services/shops.service';
export declare class ShopsController {
  private readonly shopsService;
  constructor(shopsService: ShopsService);
  getNearbyShops(cep: string): Promise<any>;
  listAll(): Promise<Shop[]>;
}
