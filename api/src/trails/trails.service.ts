import { HttpException, HttpStatus } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Park } from 'src/parks/parks.entity';
import { Repository } from 'typeorm';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { Trail } from './entities/trail.entity';

@Injectable()
export class TrailsService {

  constructor(
    @InjectRepository(Trail)
    private readonly trailRepository: Repository<Trail>,

    @InjectRepository(Park)
    private readonly parkRepository: Repository<Park>,
  ) { }

  async create(createTrailDto: CreateTrailDto): Promise<Trail> {
    const t = await this.createTrailOb(createTrailDto);
    return await this.trailRepository.save(t);
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

  async getParkFromId(id: number): Promise<Park> {
    return await this.parkRepository.findOne(id);
  }

  async createTrailOb(createTrailDto: CreateTrailDto): Promise<Trail> {
    const t: Trail = new Trail();
    t.description = createTrailDto.description;
    t.difficulty = createTrailDto.difficulty;
    t.elevationGain = createTrailDto.elevationGain;
    t.image = createTrailDto.image;
    t.lat = createTrailDto.lat;
    t.length = createTrailDto.length;
    t.lon = createTrailDto.lon;
    t.name = createTrailDto.name;
    t.park = await this.getParkFromId(createTrailDto.parkId);
    t.description = createTrailDto.description;
    t.routeType = createTrailDto.routeType;
    return t;
  }
}
