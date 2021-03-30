import { Body, Post, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { Controller, Get } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthUserDto } from "src/users/dto/auth-user.dto";
import { User } from 'src/users/users.entity';
import { UsersService } from "src/users/users.service";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Request() req): Promise<any> {
    return this.authServices.login(req.user);
  }
}