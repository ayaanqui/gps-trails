import User from './User';

export interface Review {
  review: string;
  rating: number;
  user: User;
}