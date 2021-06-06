import { Review } from '../types/Review';
import { Heading, Box, Text, Flex, Button } from '@chakra-ui/react';
import { getStars } from '../util/stars';
export default function ({ reviews }: { reviews: Review[] }) {
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

        <Button colorScheme='blue' size='sm'>Write Review</Button>
      </Flex>

      {reviews.map((review, i) => (
        <Box mb='5' key={`review${i}`}>
          <Heading size='sm'>{review.user.name}</Heading>
          {getStars(review.rating, '3')}
          <Text fontSize='sm'>
            {review.review}
          </Text>
        </Box>
      ))}
    </>
  )
}