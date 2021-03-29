import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUserDto from "./dto/create-user.dto";
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async hashPassword(password: string, saltOrRounds: number): Promise<string> {
    /**
     * See https://docs.nestjs.com/security/encryption-and-hashing
     * for more info on hashing with Bcrypt
     */
    return hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  async insert(user: CreateUserDto): Promise<any> {
    const userEntity: User = User.create();
    userEntity.email = user.email;
    userEntity.name = user.name;
    userEntity.password = await this.hashPassword(user.password, 10);

    await User.save(userEntity);
    return {
      message: `${user.email} created!`
    };
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email: email });
  }

  async remove(email: string): Promise<any> {
    await this.usersRepository.delete(email);
    return {
      message: `${email} deleted!`
    };
  }
}