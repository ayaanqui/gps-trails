import { Park } from "../parks.entity";

export class CreateParkDto {
  name: string;
  image: string;
  description: string;
  lat: number;
  lon: number;
  parkArea: number;
  contact: string;
  location: string;

  static toPark(c: CreateParkDto): Park {
    const trail: Park = new Park();
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