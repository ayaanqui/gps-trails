export class Trail {
    id: number; 
    name: string; 
    image: string; 
    description: string; 
    ratingsAvg: number; 
    views: number;
    lon: number;
    lat: number;

    constructor(id: number, name: string, image: string, description: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.ratingsAvg = this.genRandomDec(0, 5, 1);
        this.views = this.genRandom(231, 14841131);
        this.lat = this.genRandomDec(-180, 180, 3);
        this.lon = this.genRandomDec(-180, 180, 3);
    }

    private genRandom(min: number, max:number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    private genRandomDec(from: number, to: number, fixed: number): number {
        return Number.parseFloat((Math.random() * (to - from) + from).toFixed(fixed)) * 1;
    }
};