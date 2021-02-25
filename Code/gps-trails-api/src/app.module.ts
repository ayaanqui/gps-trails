import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrailsController } from './trails/trails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Blue420Sky',
      database: 'NestJSUserDB',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, TrailsController],
})
export class AppModule {}
