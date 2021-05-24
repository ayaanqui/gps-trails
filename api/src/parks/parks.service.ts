import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trail } from "./parks.entity";
import { CreateTrailDto } from './dto/createParkDto';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail)
    private readonly trailRepository: Repository<Trail>,
  ) { }

  async findById(id: number): Promise<Trail> {
    return await this.trailRepository.findOne(id);
  }

  async insert(trail: Trail): Promise<Trail> {
    return await Trail.save(trail);
  }

  async findAll(): Promise<Trail[]> {
    return await this.trailRepository.find();
  }
}