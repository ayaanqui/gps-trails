import { Park } from '../../parks/parks.entity';
export class CreateTrailDto {
  name: string;
  ratingsAvg: number;
  image: string;
  description: string;
  length: number;
  lat: number;
  lon: number;
  difficulty: number;
  routeType: string;
  elevationGain: number;
  park: Park;
}
