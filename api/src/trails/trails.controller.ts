import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { Trail } from './entities/trail.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTrailDto: CreateTrailDto): Promise<Trail> {
    return await this.trailsService.create(createTrailDto);
  }

  @Get()
  async findAll(): Promise<Trail[]> {
    return await this.trailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Trail> {
    return await this.trailsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTrailDto: UpdateTrailDto): Promise<UpdateResult> {
    return await this.trailsService.update(+id, updateTrailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.trailsService.remove(+id);
  }
}
