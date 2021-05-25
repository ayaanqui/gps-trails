import { Park } from '../../parks/parks.entity';
export class CreateTrailDto {
  name: string;
  image: string;
  description: string;
  length: number;
  lat: number;
  lon: number;
  difficulty: number;
  routeType: string;
  elevationGain: number;
  parkId: number;
}
