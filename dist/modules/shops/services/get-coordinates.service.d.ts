export declare class GetCoordinatesService {
    fetchCoordinates(address: string): Promise<{
        latitude: number;
        longitude: number;
    }>;
}
