import {
  Heading,
  Box,
  Text,
  Flex,
  Image,
  Link,
  Icon,
} from '@chakra-ui/react';
import Park from "../types/Park";
import api from '../util/api';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

const starElement = (icon: IconType) => (
  <Icon
    as={icon}
    mr='0.5'
    color='yellow.400'
  />
);

const getStars = (ratingsAvg: number) => {
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

const numFormat = (num: number): string => {
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 10 }).format(num)
}

export default function ParkList({ parks }: { parks: Array<Park> }) {

  return (
    <>
      {parks.map(
        park => (
          <Box p='5' mb='3' key={`park#${park.id}`}>
            <Flex
              direction='row'
              alignItems='start'
              justifyContent='space-between'
            >

              <Link href={`/park/${park.id}`} flex='1'>
                <Image
                  src={`${api.static}${park.image}`}
                  borderRadius='lg'
                  maxW='100%'

                  overflow='hidden'
                  loading='lazy'
                />
              </Link>

              <Box
                flex='2'
                pl='4' pr='4'
                pt='1' pb='1'
              >
                <Heading size='lg'>
                  <Link href={`/park/${park.id}`}>
                    {park.name}
                  </Link>
                </Heading>

                <Flex
                  size='xs'
                  color='gray.500'
                  mb='1'
                  direction='row'
                  justifyContent='space-between'
                >
                  <Text mr='4'>{park.location}</Text>

                  <Text>{numFormat(park.parkArea)} acres</Text>
                </Flex>

                <Flex mb='3'>
                  {getStars(park.ratingsAvg).map((star, i) => (
                    <span key={`park#${park.id}Rating#${i}`}>
                      {star}
                    </span>
                  ))}
                  <Text color='gray.600'>
                    ({park.ratingsAvg})
                  </Text>
                </Flex>

                <Text noOfLines={3}>{park.description}</Text>
              </Box>
            </Flex>
          </Box>
        )
      )}
    </>
  )
}