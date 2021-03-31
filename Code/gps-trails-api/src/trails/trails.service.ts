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

  async insert(trailData: CreateTrailDto): Promise<Trail> {
    const newTrail: Trail = CreateTrailDto.createAndGetTrail(trailData);
    await Trail.save(newTrail);
    return newTrail;
  }

  async findAll(): Promise<Trail[]> {
    return await this.trailRepository.find();
  }
}