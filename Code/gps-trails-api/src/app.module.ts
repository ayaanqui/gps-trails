import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrailsController } from './trails/trails.controller';

@Module({
  imports: [],
  controllers: [AppController, TrailsController],
})
export class AppModule {}
