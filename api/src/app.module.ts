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
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { Trail } from './trails/trails.entity';
import { TrailsService } from './trails/trails.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AddTrailsService,
    AddTrailsModule,
    TypeOrmModule.forFeature([User, Trail, AddTrails], ),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60 days' },
    }),
    PassportModule
  ],
  providers: [UsersService, TrailsService, AddTrailsService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AppController, TrailsController, AddTrailsController, AuthController, RegisterController],
})
export class AppModule { }
