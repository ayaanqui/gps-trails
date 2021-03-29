import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { Trail } from "./trail";
import { data } from "./trails.json";

@Controller('trails')
export class TrailsController {

    trails: Array<Trail> = new Array<Trail>();
    nameToTrailMap: Map<string, Trail> = new Map<string, Trail>();

    constructor() {
        data.forEach((t, i) => {
            let trailOb = new Trail(i, t.name, t.image, t.description, t.latitude, t.longitude, t.parkarea, t.contact, t.subtrails, t.ratingsAvg, t.views);

            this.trails.push(trailOb);
            this.nameToTrailMap.set(trailOb.name, trailOb);
        });
    }

    @Get()
    getAllTrails(): Trail[] {
        return this.trails;
    }

    @Get(':id')
    getTrailById(@Param() params): Trail {
        const id: number = params ?.id;
        if (id == null || id >= this.trails.length)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Trail not found',
            },
                HttpStatus.NOT_FOUND);
        return this.trails[id];
    }

}