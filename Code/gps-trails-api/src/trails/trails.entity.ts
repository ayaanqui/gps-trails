import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('trails')
export class Trail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    image: string;

    @Column('text')
    description: string;

    @Column('double')
    lat: number;

    @Column('double')
    lon: number;

    @Column('double')
    ratingsAvg: number = 0.0;
    
    @Column('bigint')
    views: number = 0.0;

    @Column()
    location: string;

    @Column('bigint')
    areaAcres: number;

    @Column()
    contact: string = "";
}