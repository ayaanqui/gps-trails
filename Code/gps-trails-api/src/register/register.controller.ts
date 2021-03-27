import { Body, Controller, Post, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import CreateUserDto from "src/users/dto/create-user.dto";
import { UsersService } from '../users/users.service';
import { validate } from 'email-validator';

@Controller('register')
export class RegisterController {

    constructor(private readonly userServices: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async postRegisterUser(@Body() user: CreateUserDto): Promise<object> {
        const validUserObject: HttpException = this.validateUserObject(user);
        if (validUserObject != null)
            throw validUserObject;
        
        if (!this.validateEmail(user.email))
            throw new HttpException(
                { message: 'Invalid email' },
                HttpStatus.BAD_REQUEST
            );
        
        // Check if user with user.email already exists
        const emailUser = await this.userServices.findOne(user.email);
        if (emailUser != null)
            throw new HttpException(
                { message: 'User with the email already exists' },
                HttpStatus.CONFLICT
            );
        
        return await this.userServices.insert(user);
    }

    /**
     * Checks if the user object is null or has missing fields
     * 
     * @param user CreateUserDto object
     * @returns Null if there are no missing fields, otherwise returns an HttpException
     */
    validateUserObject(user: CreateUserDto): HttpException {
        if (user == null)
            return new HttpException(
                { message: "Invalid user object" }, 
                HttpStatus.BAD_REQUEST
            );

        if (user.email == null || user.name == null || user.password == null)
            return new HttpException(
                { message: "Required fields: email, name, password" }, 
                HttpStatus.BAD_REQUEST
            );
        
        return null;
    }

    validateEmail(email: string): boolean {
        return validate(email);
    }

}