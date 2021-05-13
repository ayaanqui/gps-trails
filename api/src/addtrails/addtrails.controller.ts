import { Controller, Body, Post } from "@nestjs/common";
import { AddTrailsService } from './addtrails.service';
import CreateTrailDto from './dto/create-trail-dto';

@Controller('addtrails')
export class AddTrailsController {

    constructor(readonly addTrailService: AddTrailsService) { }

    @Post('add')
    checkLogin(@Body() addTrail: CreateTrailDto) {
        return this.addTrailService.insert(addTrail);
    }

}