import { GetCoordinatesService } from './get-coordinates.service';
export declare class GetDistanceService {
  private readonly getCoordinatesService;
  constructor(getCoordinatesService: GetCoordinatesService);
  calculateDistance(originCep: string, destinationCep: string): Promise<number>;
}
