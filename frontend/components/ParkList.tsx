import { Heading, Box, Text, Flex, Image, Link } from '@chakra-ui/react';
import Park from "../types/Park";
import api from '../util/api';

export default function ParkList({ parks }: { parks: Array<Park> }) {
  const numFormat = (num: number): string => {
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(num)
  }

  return (
    <>
      {parks.map(
        park => (
          <Box p='5' mb='3'>
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
                pt='3' pb='3'
              >
                <Heading size='lg'>
                  <Link href={`/park/${park.id}`}>
                    {park.name}
                  </Link>
                </Heading>
                <Flex
                  size='xs'
                  color='gray.500'
                  mb='2'
                  direction='row'
                  justifyContent='space-between'
                >
                  <Text mr='4'>{park.location}</Text>

                  <Text>{numFormat(park.parkArea)} acres</Text>
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