import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

interface OpenStreetMapResponse {
  lat: string;
  lon: string;
}

@Injectable()
export class GetCoordinatesService {
  async fetchCoordinates(
    address: string,
  ): Promise<{ latitude: number; longitude: number }> {
    try {
      const response = await axios.get<OpenStreetMapResponse[]>(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: address,
            format: 'json',
            limit: 1,
          },
        },
      );

      if (response.data.length === 0) {
        throw new HttpException(
          'Não foi possível obter as coordenadas do endereço.',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        latitude: Number(response.data[0].lat),
        longitude: Number(response.data[0].lon),
      };
    } catch (error) {
      console.error(`Erro ao tentar obter coordenadas: ${error}`);
      throw new HttpException(
        'Erro ao tentar obter coordenadas.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
