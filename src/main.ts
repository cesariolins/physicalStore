import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  Logger.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
}

bootstrap();
