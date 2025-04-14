import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopsModule } from './modules/shops/shops.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Habilita variáveis de ambiente
    ShopsModule,
    DatabaseModule,
  ],
})
export class AppModule {}
