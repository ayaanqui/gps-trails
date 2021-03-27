import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUserDto from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;
  constructor() {}
   
  async insert(user: CreateUserDto): Promise<any> {
    const userEntity: User = User.create();
    userEntity.email = user?.email;
    userEntity.name = user?.name;
    userEntity.password = user?.password;

    await User.save(userEntity);
    return {
      message: `${user.email} created!`
    };
}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    
    return this.usersRepository.findOne(username);
  }

  async remove(username: string): Promise<void> {
    await this.usersRepository.delete(username);
  }
}