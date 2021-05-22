import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trail } from "./trails.entity";
import { CreateTrailDto } from './dto/create-trail-dto';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail)
    private readonly trailRepository: Repository<Trail>,
  ) { }

  async findById(id: number): Promise<Trail> {
    return await this.trailRepository.findOne(id);
  }

  async insert(trailData: CreateTrailDto): Promise<Trail> {
    const newTrail: Trail = CreateTrailDto.createAndGetTrail(trailData);
    return await Trail.save(newTrail);
  }

  async findAll(): Promise<Trail[]> {
    return await this.trailRepository.find();
  }
}