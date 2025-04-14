import { Module } from '@nestjs/common';
import { ShopsController } from './controllers/shops.controller';
import { ShopsService } from './services/shops.service';
import { GetDistanceService } from './services/get-distance.service';
import { GetCoordinatesService } from './services/get-coordinates.service';
import { CepValidationService } from './services/cep-validation.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [ShopsController],
  providers: [
    ShopsService,
    GetDistanceService,
    GetCoordinatesService,
    CepValidationService,
    DatabaseService,
  ],
})
export class ShopsModule {}
