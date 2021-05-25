import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Park } from '../../parks/parks.entity';

@Entity('trails')
export class Trail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ratingsAvg: number = 0;

  @Column()
  image: string;

  @Column('text')
  description: string;

  @Column('double')
  length: number;

  @Column('double')
  lat: number;

  @Column('double')
  lon: number;

  @Column('bigint')
  views: number = 0;

  @Column()
  difficulty: number;

  @Column()
  routeType: string;

  @Column('double')
  elevationGain: number;

  @ManyToOne(() => Park, park => park.trails)
  park: Park;
}
