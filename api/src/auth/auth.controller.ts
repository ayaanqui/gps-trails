import { Body, Post, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { Controller, Get } from "@nestjs/common";
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Request() req): Promise<any> {
    return await this.authServices.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async getMe(@Request() req): Promise<{ id: number, email: string, name: string }> {
    const user = await this.authServices.checkEmail(req.user.email)
    return { id: user.id, email: user.email, name: user.name };
  }

  @Post('check-email')
  async checkEmail(@Body() body: { email: string }): Promise<{ taken: boolean }> {
    const user = await this.authServices.checkEmail(body.email);
    return { taken: user ? true : false };
  }
}