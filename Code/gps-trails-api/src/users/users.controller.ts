import { Controller, Body, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import CreateUserDto from "./dto/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(readonly usersService: UsersService) { }

    @Post('postNewUser')
    postUser(@Body() user: CreateUserDto) {
        return this.usersService.insert(user);
    }

    @Post('login')
    checkLogin(@Body() user: CreateUserDto) {
        return this.usersService.findOne(user.email);
    }

}