import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    const PORT = process.env.PORT || 3000;

    await app.listen(PORT);
    Logger.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  } catch (error) {
    if (error instanceof Error) {
      Logger.error(`Erro ao iniciar o servidor: ${error.message}`, error.stack);
    } else {
      Logger.error('Erro ao iniciar o servidor: Tipo desconhecido.');
    }
    process.exit(1);
  }
}

bootstrap().catch((error: unknown) => {
  if (error instanceof Error) {
    Logger.error(
      `Erro inesperado ao iniciar a aplicação: ${error.message}`,
      error.stack,
    );
  } else {
    Logger.error('Erro inesperado ao iniciar a aplicação: Tipo desconhecido.');
  }
});
