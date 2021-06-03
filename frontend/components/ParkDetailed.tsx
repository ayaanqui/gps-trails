import {
  Heading,
  Flex,
  Image,
  Text,
  Box,
  Icon,
} from '@chakra-ui/react'
import api from '../util/api'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { getStars } from '../util/stars'
import { numFormat } from '../util/formatters'
import Park from '../types/Park'

export default function ParkDetailed({ park }: { park: Park }) {
  return (
    <>
      <Image w='full' src={`${api.static}${park.image}`} />

      <Box p='3' mb='7'>
        <Heading mb='2'>{park.name}</Heading>
        <Flex
          size='xs'
          color='gray.500'
          mb='2'
          direction='row'
          justifyContent='space-between'
        >
          <Text mr='4' display='flex' alignItems='center'>
            <Icon
              as={FaMapMarkerAlt}
              mr='1'
            />
            {park.location}
          </Text>

          <Text>{numFormat(park.parkArea)} acres</Text>
        </Flex>
        <Box mb='7'>
          {getStars(park.ratingsAvg, '6').map((star, i) => (
            <span key={`star${i}`}>
              {star}
            </span>
          ))}
        </Box>
        <Text>
          {park.description}
        </Text>
      </Box>

      <Box p='3' mb='7'>
        <Heading size='md'>
          Reviews (11)
        </Heading>
      </Box>
    </>
  )
}