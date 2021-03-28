import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrailsController } from './trails/trails.controller';

import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';

import { AddTrailsController } from './addtrails/addtrails.controller';
import { AddTrailsService } from './addtrails/addtrails.service';
import { AddTrailsModule } from './addtrails/addtrails.module';
import { AddTrails } from './addtrails/addtrails.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    UsersService,
    AddTrailsService,
    AddTrailsModule,
    TypeOrmModule.forFeature([User, AddTrails], )
  ],
  providers: [UsersService, AddTrailsService],
  controllers: [AppController, TrailsController, UsersController, AddTrailsController],
})
export class AppModule { }
