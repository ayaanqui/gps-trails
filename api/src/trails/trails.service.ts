import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { Trail } from './entities/trail.entity';

@Injectable()
export class TrailsService {

  constructor(
    @InjectRepository(Trail)
    private readonly trailRepository: Repository<Trail>,
  ) { }

  async create(createTrailDto: CreateTrailDto): Promise<Trail> {
    const t: Trail = new Trail();
    t.description = createTrailDto.description;
    t.difficulty = createTrailDto.difficulty;
    t.elevationGain = createTrailDto.elevationGain;
    t.image = createTrailDto.image;
    t.lat = createTrailDto.lat;
    t.length = createTrailDto.length;
    t.lon = createTrailDto.lon;
    t.name = createTrailDto.name;
    t.park = createTrailDto.park;
    t.description = createTrailDto.description;
    t.ratingsAvg = createTrailDto.ratingsAvg;

    return await Trail.save(t);
  }

  async findAll() {
    return await this.trailRepository.find();
  }

  async findOne(id: number) {
    return await this.trailRepository.findOne(id);
  }

  async update(id: number, updateTrailDto: UpdateTrailDto) {
    return await this.trailRepository.update(id, updateTrailDto);
  }

  async remove(id: number) {
    return await this.trailRepository.delete(id);
  }

}
