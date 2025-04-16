'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const app_module_1 = require('../../app.module');
const common_1 = require('@nestjs/common');
async function bootstrap() {
  try {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    common_1.Logger.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  } catch (error) {
    if (error instanceof Error) {
      common_1.Logger.error(
        `Erro ao iniciar o servidor: ${error.message}`,
        error.stack,
      );
    } else {
      common_1.Logger.error('Erro ao iniciar o servidor: Tipo desconhecido.');
    }
    process.exit(1);
  }
}
bootstrap().catch((error) => {
  if (error instanceof Error) {
    common_1.Logger.error(
      `Erro inesperado ao iniciar a aplicação: ${error.message}`,
      error.stack,
    );
  } else {
    common_1.Logger.error(
      'Erro inesperado ao iniciar a aplicação: Tipo desconhecido.',
    );
  }
});
//# sourceMappingURL=logger.js.map
