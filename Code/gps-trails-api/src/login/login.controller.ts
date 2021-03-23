import { Controller, Get, Body, Post } from "@nestjs/common";
import { LoginService } from "./login.service";

@Controller()
export class LoginController {

    constructor(private readonly loginService: LoginService) { }

    @Post('login')
    addLoginUser(@Body('username') username: string, @Body('password') password: string): any {
        this.loginService.insertLoginDetails(username, password);
        return username;
    }

}