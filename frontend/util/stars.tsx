import {
  Icon,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { Token } from '@chakra-ui/styled-system/dist/types/utils';
import * as CSS from "csstype";

export const starElement = (icon: IconType, iconSize?: Token<CSS.Property.Width | number, "sizes">) => (
  <>
    {iconSize ? (
      <Icon
        as={icon}
        mr='0.5'
        color='yellow.400'
        boxSize={iconSize}
      />
    ) : (
      <Icon
        as={icon}
        mr='0.5'
        color='yellow.400'
        boxSize=''
      />
    )}
  </>
);

export const getStars = (ratingsAvg: number, iconSize?: Token<CSS.Property.Width | number, "sizes">) => {
  const stars: any[] = [];
  const ratings: number = ratingsAvg;
  let leftovers: number = 5 - ratings;

  let r = ratings;

  for (let i = 0; i < Math.floor(ratings); i++) {
    stars.push(starElement(BsStarFill, iconSize));
    r -= 1;
  }

  // Add half star if r is not 0
  if (r > 0) {
    stars.push(starElement(BsStarHalf, iconSize));
    leftovers--;
  }

  // Add left over empty stars
  for (let i = 0; i < leftovers; i++)
    stars.push(starElement(BsStar, iconSize));
  return stars;
};