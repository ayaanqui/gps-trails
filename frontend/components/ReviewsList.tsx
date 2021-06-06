import { Review } from '../types/Review';
import {
  Heading,
  Box,
  Text,
  Flex,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { getStars } from '../util/stars';
import React, { useState } from 'react';
import Park from '../types/Park';
import CreateReview from './CreateReview';
import { useEffect } from 'react';
import { authStore } from '../store/authStore';

export default function ReviewsList({ reviews, addReview, park }: {
  reviews: Review[],
  addReview: Function,
  park: Park
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loggedIn, setLoggedIn] = useState(false)
  const [val, setVal] = useState(false)

  useEffect(() => {
    setLoggedIn(authStore.getState().loggedIn)
  }, [val])

  return (
    <>
      <Flex
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb='7' pb='2'
        borderBottomWidth='thin'
      >
        <Heading size='md'>
          Reviews ({reviews.length})
        </Heading>

        {
          loggedIn ? (
            <Button onClick={onOpen} colorScheme='blue' size='sm'>Write Review</Button>
          ) : (
            <></>
          )
        }
      </Flex>

      {
        reviews.length === 0 ? (
          <Flex mb='5' alignItems='center' justifyContent='center'>
            <Text color='gray.500'>
              <i>Be the first to review this park</i>
            </Text>
          </Flex>
        ) : (
          reviews.map((review, i) => (
            <Box mb='5' key={`review${i}`}>
              <Heading size='sm'>{review.user.name}</Heading>
              {getStars(review.rating, '3')}
              <Text fontSize='sm'>
                {review.review}
              </Text>
            </Box>
          ))
        )
      }

      <CreateReview
        addReview={addReview}
        park={park}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  )
}