import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ParksController } from './parks/parks.controller';
import { User } from './users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { RegisterController } from './register/register.controller';
import { AuthController } from './auth/auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

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
import { Park } from './parks/parks.entity';
import { ParksService } from './parks/parks.service';
import { TrailsController } from './trails/trails.controller';
import { TrailsService } from './trails/trails.service';
import { Trail } from './trails/entities/trail.entity';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { imageFileFilter } from './util/multerConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      User,
      Park,
      AddTrails,
      Trail,
    ]),

    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60 days' },
    }),

    // Multer image upload
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
        fileFilter: imageFileFilter
      }),
    }),

    // Serving static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),

    AddTrailsModule,
    PassportModule,
  ],
  providers: [
    UsersService,
    ParksService,
    AddTrailsService,
    AuthService,
    TrailsService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [
    AppController,
    ParksController,
    TrailsController,
    AddTrailsController,
    AuthController,
    RegisterController,
  ],
})
export class AppModule { }
