import { Trail } from "../parks.entity";

export class CreateTrailDto {
  name: string;
  image: string;
  description: string;
  lat: number;
  lon: number;
  parkArea: number;
  views: number = 0.0;
  ratingsAvg: number = 0.0;
  contact: string;
  location: string;

  static toTrail(c: CreateTrailDto): Trail {
    const trail: Trail = new Trail();
    trail.name = c.name;
    trail.image = c.image;
    trail.description = c.description;
    trail.lat = c.lat;
    trail.lon = c.lon;
    trail.parkArea = c.parkArea;
    trail.contact = c.contact;
    trail.location = c.location;
    return trail;
  }
}