import { db } from "../services/db"

export const startDB = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(
          `
          CREATE TABLE IF NOT EXISTS lojas (
            nome TEXT,
            rua TEXT,
            numero INTEGER,
            bairro TEXT,
            cidade TEXT,
            cep TEXT,
            telefone INTEGER
            latitude REAL,
            longitude REAL
          );
          `,
          (err) => {
            if (err) reject(err)
            else resolve()
          }
        )
      })
    })
  }