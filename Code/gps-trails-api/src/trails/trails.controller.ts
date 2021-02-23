import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
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

    @Get(':id')
    getTrailById(@Param() params): Trail {
        const id: number = params?.id;
        if (id == null || id >= this.trails.length)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Trail not found',
            }, 
            HttpStatus.NOT_FOUND);
        return this.trails[id];
    }

}