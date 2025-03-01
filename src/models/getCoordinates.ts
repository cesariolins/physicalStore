import axios from 'axios'

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
        throw new Error('Não foi possível obter as coordenadas do endereço.');
      }
  
      return {
        latitude: Number(response.data[0].lat),
        longitude: Number(response.data[0].lon),
      }
    } catch (error) {
      throw new Error('Erro na geocodificação do endereço.')
    }
  };