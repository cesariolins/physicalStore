import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GetCoordinatesService } from './get-coordinates.service';
import axios from 'axios';

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

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=SEU_API_KEY_DO_GOOGLE`;

      const response = await axios.get(url);
      const data = response.data;

      if (data.routes.length > 0) {
        const route = data.routes[0];
        const distance = route.legs[0].distance.value; // Distância em metros
        return distance;
      } else {
        throw new HttpException(
          'Nenhuma rota encontrada.',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Erro ao calcular a distância.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
