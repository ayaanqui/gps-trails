import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTrailDto } from './dto/createTrailDto';
import { TrailsService } from "./trails.service";
import { Trail } from "./trails.entity";

@Controller('trails')
export class TrailsController {

  constructor(private readonly trailServices: TrailsService) {
  }

  @Get()
  async getAllTrails(): Promise<Trail[]> {
    return await this.trailServices.findAll();
  }

  @Get(':id')
  async getTrailById(@Param() params): Promise<Trail> {
    const id: number = params?.id;
    const post: Trail = await this.trailServices.findById(id);
    if (id == null || post == null)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Trail not found',
        },
        HttpStatus.NOT_FOUND
      );
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewTrail(@Body() trailData: CreateTrailDto): Promise<Trail> {
    const t: Trail = CreateTrailDto.toTrail(trailData);

    if (!t)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Something went wrong'
        },
        HttpStatus.BAD_REQUEST
      );
    return await this.trailServices.insert(t);
  }

}