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

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne(email);
  }

  async remove(email: string): Promise<any> {
    await this.usersRepository.delete(email);
    return {
      message: `${email} deleted!`
    };
  }
}