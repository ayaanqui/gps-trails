import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrailsController } from './trails/trails.controller';
import { User } from './users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { RegisterController } from './register/register.controller';
import { AuthController } from './auth/auth.controller';

import { AddTrailsController } from './addtrails/addtrails.controller';
import { AddTrailsService } from './addtrails/addtrails.service';
import { AddTrailsModule } from './addtrails/addtrails.module';
import { AddTrails } from './addtrails/addtrails.entity';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AddTrailsService,
    AddTrailsModule,
    TypeOrmModule.forFeature([User, AddTrails], )
  ],
  providers: [UsersService, AddTrailsService, AuthService, LocalStrategy],
  controllers: [AppController, TrailsController, AddTrailsController, AuthController, RegisterController],
})
export class AppModule { }
