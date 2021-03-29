import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userServices: UsersService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user: User = await this.userServices.findOne(email);
        if (user == null)
            return null;
        
        const passwordMatch: boolean = await this.userServices.comparePassword(password, user.password);
        if (!passwordMatch)
            return null;
        return user;
    }
}
