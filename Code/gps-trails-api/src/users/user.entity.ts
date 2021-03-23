import {Entity, BaseEntity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    addedReviews: string;

    @Column()
    addedTrails: string;

}