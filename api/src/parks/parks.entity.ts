import { Trail } from "src/trails/entities/trail.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('parks')
export class Park extends BaseEntity {
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
  parkArea: number;

  @Column('bigint')
  views: number = 0.0;

  @Column('double')
  ratingsAvg: number = 0.0;

  @Column()
  contact: string;

  @Column()
  location: string;

  @OneToMany(() => Trail, trail => trail.park)
  trails: Trail[];
}