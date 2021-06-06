import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Review } from 'src/reviews/entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createReviewDto: CreateReviewDto
  ) {
    const user = req.user;
    const newReview = await this.reviewsService.create(createReviewDto, user);
    return newReview;
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':parkId')
  async findParkReview(@Param('parkId') parkId: number): Promise<Review[]> {
    return await this.reviewsService.findByParkId(parkId);
  }
}
