import { Controller, Get } from "@nestjs/common";
import { Trail } from "./trail";
import { data } from "./trails.json";

@Controller('trails')
export class TrailsController {
    
    trails: Array<Trail> = new Array<Trail>();

    constructor() {
        data.forEach((trail, i) => {
            this.trails.push(new Trail(i, trail.name, trail.image, trail.description));
        });
    }

    @Get()
    getAllTrails(): Trail[] {
        return this.trails;
    }

}