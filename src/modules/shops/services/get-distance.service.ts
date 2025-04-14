import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GetCoordinatesService } from './get-coordinates.service';
import axios from 'axios';

interface GoogleMapsResponse {
  routes: Array<{
    legs: Array<{
      distance: {
        value: number;
      };
    }>;
  }>;
}

@Injectable()
export class GetDistanceService {
  constructor(private readonly getCoordinatesService: GetCoordinatesService) {}

  async calculateDistance(
    originCep: string,
    destinationCep: string,
  ): Promise<number> {
    try {
      const originCoordinates =
        await this.getCoordinatesService.fetchCoordinates(originCep);
      const destinationCoordinates =
        await this.getCoordinatesService.fetchCoordinates(destinationCep);

      const origin = `${originCoordinates.latitude},${originCoordinates.longitude}`;
      const destination = `${destinationCoordinates.latitude},${destinationCoordinates.longitude}`;

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.KEY_GOOGLE}`;

      const response = await axios.get<GoogleMapsResponse>(url);
      const data = response.data;

      if (data.routes.length > 0) {
        const route = data.routes[0];
        const distance = route.legs[0].distance.value;
        return distance;
      } else {
        throw new HttpException(
          'Nenhuma rota encontrada.',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error(`Erro ao calcular a distância: ${error}`);
      throw new HttpException(
        'Erro ao calcular a distância.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
