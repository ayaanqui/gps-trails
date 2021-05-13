import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AddTrails extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    emailid: string;

    @Column()
    name: string;

    @Column()
    parkname: string;

    @Column()
    trailname: string;

    @Column()
    experience: string;

}