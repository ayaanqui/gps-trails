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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'NestJSUserDB',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    UsersService,
    TypeOrmModule.forFeature([User], )
  ],
  providers: [UsersService],
  controllers: [AppController, TrailsController, UsersController],
})
export class AppModule { }
