import { db } from "../services/db"

interface Loja {
    nome: string;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    cep: string;
    telefone: number;
    latitude: number;
    longitude: number;
  }
  
  const lojas: Loja[] = []
  
  export const insertData = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT COUNT(*) as count FROM lojas',
        (err: Error | null, row: { count: number } | undefined) => {
          if (err) {
            return reject(err)
          }
  
          if (row === undefined) {
            return reject(new Error('Nenhum resultado retornado do banco de dados.'))
          }
  
          if (row.count === 0) {
          
            const stmt = db.prepare(
              'INSERT INTO lojas (nome, rua, numero, bairro, cidade, cep, telefone, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            )
  
            lojas.forEach((loja) => {
              stmt.run(loja.nome, loja.rua, loja.numero, loja.bairro, loja.cidade, loja.cep, loja.telefone, loja.latitude, loja.longitude)
            })
  
            stmt.finalize((err) => {
              if (err) reject(err)
              else {
                console.log('Dados inseridos no banco de dados.')
                resolve()
              }
            })
          } else {
            console.log('Dados já existem no banco de dados.')
            resolve()
          }
        }
      )
    })
  }