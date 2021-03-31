export class Trail {
  id: number;
  name: string;
  image: string;
  description: string;
  ratingsAvg: number;
  views: string;
  lon: number;
  lat: number;
  parkarea: number;
  contact: string;
  subtrails: any;


  constructor(id: number, name: string, image: string, description: string, lat: number, lon: number, parkarea: number, contact: string,
    subtrails: any, ratingsAvg: number, views: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.ratingsAvg = ratingsAvg;
    this.views = views;
    this.lat = lat;

    this.lon = lon;
    this.parkarea = parkarea;
    this.contact = contact;
    this.subtrails = subtrails;
  }

  private genRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private genRandomDec(from: number, to: number, fixed: number): number {
    return Number.parseFloat((Math.random() * (to - from) + from).toFixed(fixed)) * 1;
  }
};