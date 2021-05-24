import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateParkDto } from './dto/createParkDto';
import { ParksService } from "./parks.service";
import { Park } from "./parks.entity";

@Controller('parks')
export class ParksController {

  constructor(private readonly parkservices: ParksService) {
  }

  @Get()
  async getAllParks(): Promise<Park[]> {
    return await this.parkservices.findAll();
  }

  @Get(':id')
  async getParkById(@Param() params): Promise<Park> {
    const id: number = params?.id;
    const post: Park = await this.parkservices.findById(id);
    if (id == null || post == null)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Park not found',
        },
        HttpStatus.NOT_FOUND
      );
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewPark(@Body() trailData: CreateParkDto): Promise<Park> {
    const t: Park = CreateParkDto.toPark(trailData);

    if (!t)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Something went wrong'
        },
        HttpStatus.BAD_REQUEST
      );
    return await this.parkservices.insert(t);
  }

}