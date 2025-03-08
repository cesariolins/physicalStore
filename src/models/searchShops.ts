import { db } from "../services/db"
import { getDistance } from "./getDistance"
import logger from "../logger"

export const searchShops = async (cep: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM lojas;`

    db.all(query, async (err, rows: any[]) => {
      if (err) {
        logger.error('Erro ao consultar o banco de dados:', err)
        return reject({ status: 500, message: 'Erro ao consultar o banco de dados.' })
      }

      if (!rows || rows.length === 0) {
        return resolve({ status: 200, message: 'Nenhuma loja encontrada no banco de dados.' })
      }

      const nearbyShops = [];

      for (const row of rows) {
        const shopDistance = await getDistance(cep, row.cep)
        const distanceInKm = shopDistance / 1000
        if (distanceInKm <= 100) {
          nearbyShops.push({ ...row, distance: distanceInKm })
        }
      }

      if (nearbyShops.length === 0) {
        return resolve({ status: 200, message: 'Nenhuma loja encontrada no raio de 100 km.' })
      }

      nearbyShops.sort((a, b) => a.distance - b.distance)
      const updatedShops = nearbyShops.map(shop => ({
        ...shop,
        distance: `${shop.distance.toFixed(2)} km`
      }))

      resolve(updatedShops)
    })
  })
}
