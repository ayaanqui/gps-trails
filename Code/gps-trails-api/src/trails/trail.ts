export class Trail {
    id: number; 
    name: string; 
    description: string; 
    image: string; 
    ratingsAvg: number; 
    views: number;

    constructor(id: number, name: string, description: string, image: string, ratingesAvg: number, views: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.ratingsAvg = ratingesAvg;
        this.views = views;
    }
};