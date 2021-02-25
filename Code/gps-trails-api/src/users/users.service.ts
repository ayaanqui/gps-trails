import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUserDto from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;
  constructor() {}
   
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

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne(username);
  }

  async remove(username: string): Promise<void> {
    await this.usersRepository.delete(username);
  }
}