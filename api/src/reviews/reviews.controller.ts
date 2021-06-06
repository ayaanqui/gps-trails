import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Review } from 'src/reviews/entities/review.entity';
import { UsersService } from 'src/users/users.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createReviewDto: CreateReviewDto
  ): Promise<Review> {
    const user = req.user;
    return await this.reviewsService
      .create(
        createReviewDto,
        await this.usersService.findOne(user.email)
      );
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
