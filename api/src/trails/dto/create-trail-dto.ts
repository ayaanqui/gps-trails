import { Trail } from "../trails.entity";

export class CreateTrailDto {
  name: string;
  image: string;
  description: string;
  lat: number;
  lon: number;
  location: string;
  areaAcres: number;
  contact: string;

  static createAndGetTrail(trailData: CreateTrailDto): Trail {
    const newTrail: Trail = Trail.create();
    newTrail.name = trailData.name;
    newTrail.image = trailData.image;
    newTrail.description = trailData.description;
    newTrail.lat = trailData.lat;
    newTrail.lon = trailData.lon;
    newTrail.location = trailData.location;
    newTrail.areaAcres = trailData.areaAcres;
    newTrail.contact = trailData.contact;
    return newTrail;
  }
}