'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DatabaseService = void 0;
const common_1 = require('@nestjs/common');
const sqlite3_1 = require('sqlite3');
let DatabaseService = class DatabaseService {
  db;
  onModuleInit() {
    const databaseFile = process.env.DATABASE_FILE;
    if (!databaseFile) {
      throw new Error('DATABASE_FILE não está definido no arquivo .env');
    }
    this.db = new sqlite3_1.Database(databaseFile, (err) => {
      if (err) {
        console.error(`Erro ao conectar banco de dados: ${err.message}`);
      } else {
        console.info('Conectado ao banco de dados.');
      }
    });
    this.db.run(`
      CREATE TABLE IF NOT EXISTS lojas (
        nome TEXT,
        rua TEXT,
        numero INTEGER,
        bairro TEXT,
        cidade TEXT,
        cep TEXT,
        telefone INTEGER,
        latitude REAL,
        longitude REAL
      );
    `);
  }
  executeQuery(query) {
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate(
  [(0, common_1.Injectable)()],
  DatabaseService,
);
//# sourceMappingURL=database.service.js.map
