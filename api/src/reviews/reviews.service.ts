import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParksService } from 'src/parks/parks.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    private readonly parksService: ParksService,
  ) { }

  async create(createReviewDto: CreateReviewDto, user: User): Promise<Review> {
    // Fetch park...
    const park = await this.parksService.findById(createReviewDto.parkId);
    if (!park)
      throw new HttpException({
        message: 'Invalid park'
      }, HttpStatus.BAD_REQUEST)

    const review = new Review();
    review.park = park;
    review.rating = createReviewDto.rating;
    review.review = createReviewDto.review;
    review.user = user;

    return await review.save();
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find();
  }

  async findByParkId(parkId: number): Promise<Review[]> {
    const park = await this.parksService.findById(parkId);
    if (!park)
      throw new HttpException({
        message: 'Invalid park'
      }, HttpStatus.BAD_REQUEST);
    return await this.reviewsRepository.find({
      relations: ['user'],
      where: { park }
    })
  }
}
