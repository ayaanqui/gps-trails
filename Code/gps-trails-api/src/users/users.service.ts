import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUserDto from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
   
  async insert(userDetails: CreateUserDto): Promise<User>{
    const userEntity: User = User.create();
    const {username} = userDetails;
    const {password} = userDetails;
    const {firstName} = userDetails;
    const {lastName} = userDetails;
    const {addedReviews} = userDetails;
    const {addedTrails} = userDetails;
    userEntity.username = username;
    userEntity.password = password;
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;
    userEntity.addedReviews = addedReviews;
    userEntity.addedTrails = addedTrails;
    await User.save(userEntity);
    return userEntity;
}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}