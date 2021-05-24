import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post()
  create(@Body() createTrailDto: CreateTrailDto) {
    return this.trailsService.create(createTrailDto);
  }

  @Get()
  findAll() {
    return this.trailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrailDto: UpdateTrailDto) {
    return this.trailsService.update(+id, updateTrailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trailsService.remove(+id);
  }
}
