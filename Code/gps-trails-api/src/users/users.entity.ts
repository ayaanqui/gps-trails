import {Entity, BaseEntity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;
}