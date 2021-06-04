import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Park } from "./parks.entity";

@Injectable()
export class ParksService {
  constructor(
    @InjectRepository(Park)
    private readonly parkRepository: Repository<Park>,
  ) { }

  async findById(id: number): Promise<Park> {
    return await this.parkRepository.findOne(id);
  }

  async insert(park: Park): Promise<Park> {
    return await Park.save(park);
  }

  async findAll(): Promise<Park[]> {
    return await this.parkRepository.find();
  }

  async findAllWithLimit(limit: number, offset: number): Promise<Park[]> {
    return await this.parkRepository
      .createQueryBuilder('parks')
      .select()
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async searchByNameDescriptionLocation(q: string): Promise<Park[]> {
    return await this.parkRepository
      .createQueryBuilder('parks')
      .where(
        `name like :name or 
          description like :name or 
          location like :name`,
        { name: `%${q}%` })
      .getMany();
  }
}