import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Trail as OldTrail } from "./trail";
import { data } from "./trails.json";
import { CreateTrailDto } from './dto/create-trail-dto';
import { TrailsService } from "./trails.service";
import { Trail } from "./trails.entity";

@Controller('trails')
export class TrailsController {

  trails: Array<OldTrail> = new Array<OldTrail>();
  nameToTrailMap: Map<string, OldTrail> = new Map<string, OldTrail>();

  constructor(private readonly trailServices: TrailsService) {
    data.forEach((t, i) => {
      let trailOb = new OldTrail(i, t.name, t.image, t.description, t.latitude, t.longitude, t.parkarea, t.contact, t.subtrails, t.ratingsAvg, t.views);

      this.trails.push(trailOb);
      this.nameToTrailMap.set(trailOb.name, trailOb);
    });
  }

  @Get()
  getAllTrails(): OldTrail[] {
    return this.trails;
  }

  @Get(':id')
  getTrailById(@Param() params): OldTrail {
    const id: number = params?.id;
    if (id == null || id >= this.trails.length)
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Trail not found',
      },
        HttpStatus.NOT_FOUND);
    return this.trails[id];
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewTrail(@Body() trailData: CreateTrailDto): Promise<Trail> {
    const newTrail: Trail = await this.trailServices.insert(trailData);
    return newTrail;
  }

}