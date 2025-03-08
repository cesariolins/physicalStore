import axios from 'axios'
import logger from '../logger';

export const getCoordinates = async (address: string): Promise<{ latitude: number; longitude: number }> => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          limit: 1,
        },
      })
      if (response.data.length === 0) {
        logger.error('Não foi possível obter as coordenadas do endereço.')
    }
  
      return {
        latitude: Number(response.data[0].lat),
        longitude: Number(response.data[0].lon),
      }
    } catch (error) {
      logger.error(`Erro ao tentar obter coordenadas do CEP, Encerrando aplicação.`)
      process.exit(1)
    }
  }