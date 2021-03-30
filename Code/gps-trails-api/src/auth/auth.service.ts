import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userServices: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user: User = await this.userServices.findOne(email);
        if (user == null)
            return null;
        
        const passwordMatch: boolean = await this.userServices.comparePassword(password, user.password);
        if (!passwordMatch)
            return null;
        return user;
    }

    // TODO: If this doesn't work try using user: any as param
    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}
