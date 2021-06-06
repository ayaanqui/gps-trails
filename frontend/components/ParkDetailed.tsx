import {
  Heading,
  Flex,
  Image,
  Text,
  Box,
  Icon,
  Spinner
} from '@chakra-ui/react'
import api from '../util/api'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { getStars } from '../util/stars'
import { numFormat } from '../util/formatters'
import Park from '../types/Park'
import { useEffect, useState } from 'react';
import { Review } from '../types/Review';
import axios from 'axios';
import ReviewsList from './ReviewsList'

export default function ParkDetailed({ park }: { park: Park }) {
  const [reviews, setReviews] = useState(Array<Review>())
  const [blank, setBlank] = useState(false)
  const [reviewsLoading, setReviewsLoading] = useState(true)

  useEffect(() => {
    axios.get(`${api.reviews}${park.id}`)
      .then(({ data }) => {
        setReviews(data)
        setReviewsLoading(false)
      })
      .catch(err => console.log(err))
  }, [setBlank])

  return (
    <>
      <Image w='full' src={`${api.static}${park.image}`} />

      <Box p='3' mb='8'>
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

      {
        reviewsLoading ? (
          <Flex direction='row' alignItems='center' justifyContent='center' p='5'>
            <Spinner />
          </Flex>
        ) : (
            <Box p='3' mb='7'>
              <ReviewsList reviews={reviews} />
            </Box>
        )
      }
    </>
  )
}