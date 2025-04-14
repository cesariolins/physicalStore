import { Injectable, OnModuleInit } from '@nestjs/common';
import { Database } from 'sqlite3';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: Database;

  onModuleInit() {
    const databaseFile = process.env.DATABASE_FILE;
    if (!databaseFile) {
      throw new Error('DATABASE_FILE não está definido no arquivo .env');
    }

    this.db = new Database(databaseFile, (err: Error | null) => {
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

  executeQuery(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}
