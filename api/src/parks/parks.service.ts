import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Park } from "./parks.entity";

@Injectable()
export class ParksService {
  private static readonly selectAllWithRating = [
    'parks.id AS id',
    'parks.name AS name',
    'parks.description AS description',
    'parks.image AS image',
    'parks.lat AS lat',
    'parks.lon AS lon',
    'parks.location AS location',
    'parks.contact AS contact',
    'parks.views AS views',
    'parks.parkArea AS parkArea',
    'round(coalesce(avg(review.rating), 0), 1) AS ratingsAvg'
  ];

  constructor(
    @InjectRepository(Park)
    private readonly parkRepository: Repository<Park>,
  ) { }

  async findById(id: number): Promise<Park> {
    return await this.parkRepository
      .createQueryBuilder('parks')
      .select(ParksService.selectAllWithRating)
      .leftJoin('parks.reviews', 'review')
      .where('parks.id = :parkId', { parkId: id })
      .getRawOne();
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
      .select(ParksService.selectAllWithRating)
      .leftJoin('parks.reviews', 'review')
      .groupBy('parks.id')
      .limit(limit)
      .offset(offset)
      .getRawMany();
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