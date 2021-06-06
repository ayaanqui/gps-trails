import { Review } from '../types/Review';
import {
  Heading,
  Box,
  Text,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea
} from '@chakra-ui/react';
import { getStars, starElement } from '../util/stars';
import React from 'react';
import Park from '../types/Park';
import { BsStar } from 'react-icons/bs';
import { useState } from 'react';
import axios from 'axios';
import api from '../util/api';
import { authStore } from '../store/authStore';

export default function CreateReview({ addReview, park, onOpen, onClose, isOpen }: {
  addReview: Function,
  park: Park,
  onOpen: () => void,
  onClose: () => void,
  isOpen: boolean
}) {
  const [rating, setRating] = useState(0)

  const getReviewStars = () => {
    const stars: JSX.Element[] = []
    for (let i = 0; i < 5; i++) {
      stars.push(starElement(BsStar, '10'))
    }
    return stars;
  }

  const handleSubmit = (event: any) => {
    const { loggedIn, accessToken } = authStore.getState();

    console.log({
      parkId: park.id,
      rating: rating,
      review: event.target.review.value
    })

    if (!loggedIn)
      console.log("Not logged in!")

    axios.post(
      `${api.reviews}`,
      {
        parkId: park.id,
        rating: rating,
        review: event.target.review.value,
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(({ data }: { data: Review }) => {
        addReview(data)
        onClose()
      })
      .catch(err => console.log(err))

    event.preventDefault()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit} method='post'>
        <ModalContent>
          <ModalHeader>{park.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {
              getReviewStars().map((reviewStar, i) => (
                <span
                  style={{ marginRight: '5px' }}
                  key={`parkReviewStar${i}`}
                  onClick={() => setRating(i + 1)}
                >
                  {reviewStar}
                </span>
              ))
            }

            <FormControl mt={6}>
              <FormLabel>Review</FormLabel>
              <Textarea
                name='review'
                placeholder={`Share your experience on "${park.name}"`}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
            >
              Post Review
            </Button>
            <Button onClick={onClose}>Discard</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}