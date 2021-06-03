import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParksService } from 'src/parks/parks.service';

@Controller('search')
export class SearchController {

  constructor(private readonly parksService: ParksService) { }

  @Get()
  async search(@Query('q') q: string): Promise<any> {
    return await this.parksService.searchByNameDescriptionLocation(q);
  }
}
