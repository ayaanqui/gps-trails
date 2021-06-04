import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateParkDto } from './dto/createParkDto';
import { ParksService } from "./parks.service";
import { Park } from "./parks.entity";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { imageUploadConfig } from "src/util/multerConfig";

@Controller('parks')
export class ParksController {

  constructor(private readonly parkservices: ParksService) {
  }

  @Get()
  async getAllParks(
    @Query('limit') limit: number,
    @Query('page') page: number
  ): Promise<Park[]> {
    if (limit) {
      if (page) {
        const prevPage = page - 1;
        try {
          return await this.parkservices.findAllWithLimit(limit, prevPage * limit);
        } catch (e) {
          return e.toString();
        }
      }
      return await this.parkservices.findAllWithLimit(limit, 0);
    }
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
  @UseInterceptors(FileInterceptor('file', imageUploadConfig()))
  @Post()
  async createNewPark(@Body() trailData: CreateParkDto, @UploadedFile() file: Express.Multer.File): Promise<Park> {
    const t: Park = CreateParkDto.toPark(trailData);

    if (!t || !file) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Something went wrong'
        },
        HttpStatus.BAD_REQUEST
      );
    }
    t.image = file.filename;
    return await this.parkservices.insert(t);
  }

}