import { Trail } from "../trails.entity";

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

  constructor(name: string, image: string, description: string, lat: number, lon: number, parkArea: number, contact: string, location: string) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.lat = lat;
    this.lon = lon;
    this.parkArea = parkArea;
    this.contact = contact;
    this.location = location;
  }

  toTrail(): Trail {
    const trail: Trail = new Trail();
    trail.name = this.name;
    trail.image = this.image;
    trail.description = this.description;
    trail.lat = this.lat;
    trail.lon = this.lon;
    trail.parkArea = this.parkArea;
    trail.views = this.views;
    trail.ratingsAvg = this.ratingsAvg;
    trail.contact = this.contact;
    trail.location = this.location;
    return trail;
  }
}