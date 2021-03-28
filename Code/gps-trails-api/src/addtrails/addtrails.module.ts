import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddTrailsService } from './addtrails.service';
import { AddTrailsController } from './addtrails.controller';
import { AddTrails } from './addtrails.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AddTrails])],
    providers: [AddTrailsService],
    controllers: [AddTrailsController],
})
export class AddTrailsModule { }