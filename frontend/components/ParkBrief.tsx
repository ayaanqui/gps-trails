import {
  Heading,
  Box,
  Text,
  Flex,
  Image,
  Link,
} from '@chakra-ui/react';
import Park from '../types/Park';
import api from '../util/api';
import { numFormat } from '../util/formatters';
import { getStars } from '../util/stars';

export default function ParkBrief({ park }: { park: Park }) {
  return (
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
  )
}