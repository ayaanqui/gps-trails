import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrailsController } from './trails/trails.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    UsersService,
    TypeOrmModule.forFeature([User],),
  ],
  controllers: [AppController, TrailsController, UsersController],
})
export class AppModule {}
