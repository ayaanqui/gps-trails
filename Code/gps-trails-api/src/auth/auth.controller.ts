import { Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get } from "@nestjs/common";
import { AuthUserDto } from "src/users/dto/auth-user.dto";
import { User } from 'src/users/user.entity';
import { UsersService } from "src/users/users.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly userServices: UsersService) {}

  @Post('login')
  async postLogin(@Body() loginData: AuthUserDto): Promise<any> {
    const validLoginObject: HttpException = this.validateLoginObject(loginData)
    if (validLoginObject != null)
      throw validLoginObject;
    
    const user: User = await this.userServices.findOne(loginData.email);
    if (user == null)
      throw new HttpException(
        { message: 'Incorrect email or password' }, 
        HttpStatus.NOT_FOUND
      );
    
    const passwordMatch: boolean = await this.userServices.comparePassword(loginData.password, user.password);
    if (!passwordMatch)
      throw new HttpException(
        { message: 'Incorrect email or password' }, 
        HttpStatus.NOT_FOUND
      );
    
    return {message: 'Authentication successful!'}
  }

  validateLoginObject(loginData: AuthUserDto): HttpException {
    if (loginData == null)
      return new HttpException({message: 'Invalid object'}, HttpStatus.BAD_REQUEST);
    
    if (loginData.email == null || loginData.password == null)
      return new HttpException(
        { message: 'Required fields: email, password' }, 
        HttpStatus.BAD_REQUEST
      );
    
    return null;
  }
}