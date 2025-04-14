import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  async getNearbyShops(@Query('cep') cep: string) {
    if (!cep) {
      throw new HttpException('CEP é obrigatório', HttpStatus.BAD_REQUEST);
    }

    return await this.shopsService.getShopsByCep(cep);
  }
}
