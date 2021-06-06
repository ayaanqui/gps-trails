import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Park } from 'src/parks/parks.entity';
import { User } from 'src/users/users.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  review: string;

  @Column('double')
  rating: number;

  @ManyToOne(() => Park, park => park.reviews)
  park: Park;

  @ManyToOne(() => User, user => user.reviews)
  user: User;
}
