import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ParksController } from './parks/parks.controller';
import { User } from './users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { RegisterController } from './register/register.controller';
import { AuthController } from './auth/auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

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
import { join } from 'path';
import { SearchController } from './search/search.controller';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      User,
      Park,
      Trail,
    ]),

    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60 days' },
    }),

    // Serving static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),

    PassportModule,
    ReviewsModule,
  ],
  providers: [
    UsersService,
    ParksService,
    AuthService,
    TrailsService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [
    AppController,
    ParksController,
    TrailsController,
    AuthController,
    RegisterController,
    SearchController,
  ],
})
export class AppModule { }
