import { Controller, Get } from "@nestjs/common";
import { Trail } from "./trail";

@Controller('trails')
export class TrailsController {
    
    @Get()
    getAllTrails(): Trail[] {
        return [];
    }

}