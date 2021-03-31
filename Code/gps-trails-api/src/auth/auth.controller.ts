import { Body, Post, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { Controller, Get } from "@nestjs/common";
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Request() req): Promise<any> {
    return this.authServices.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  getMe(@Request() req): any {
    return req.user;
  }
}