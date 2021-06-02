import {
  Icon,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

export const starElement = (icon: IconType) => (
  <Icon
    as={icon}
    mr='0.5'
    color='yellow.400'
  />
);

export const getStars = (ratingsAvg: number) => {
  const stars: any[] = [];
  const ratings: number = ratingsAvg;
  let leftovers: number = 5 - ratings;

  let r = ratings;

  for (let i = 0; i < Math.floor(ratings); i++) {
    stars.push(starElement(BsStarFill));
    r -= 1;
  }

  // Add half star if r is not 0
  if (r > 0) {
    stars.push(starElement(BsStarHalf));
    leftovers--;
  }

  // Add left over empty stars
  for (let i = 0; i < leftovers; i++)
    stars.push(starElement(BsStar));
  return stars;
};