import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AddTrails } from './addtrails.entity';
import CreateTrailDto from './dto/create-trail-dto';

@Injectable()
export class AddTrailsService {
    private usersRepository: Repository<AddTrails>;
    constructor() { }

    async insert(userDetails: CreateTrailDto): Promise<AddTrails> {
        const userEntity: AddTrails = AddTrails.create();
        const { emailid } = userDetails;
        const { name } = userDetails;
        const { parkname } = userDetails;
        const { trailname } = userDetails;
        const { experience } = userDetails;

        userEntity.emailid = emailid;
        userEntity.name = name;
        userEntity.parkname = parkname;
        userEntity.trailname = trailname;
        userEntity.experience = experience;

        await AddTrails.save(userEntity);
        return userEntity;
    }

    findAll(): Promise<AddTrails[]> {
        return this.usersRepository.find();
    }

    findOne(username: string): Promise<AddTrails> {

        return this.usersRepository.findOne(username);
    }

    async remove(username: string): Promise<void> {
        await this.usersRepository.delete(username);
    }
}