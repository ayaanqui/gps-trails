import { Review } from '../types/Review';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton
} from '@chakra-ui/react';
import { starElement } from '../util/stars';
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const getReviewStars = () => {
    const stars: JSX.Element[] = []
    for (let i = 0; i < 5; i++) {
      stars.push(starElement(BsStar, '10'))
    }
    return stars;
  }

  const handleSubmit = (event: any) => {
    const { loggedIn, accessToken } = authStore.getState();
    setLoading(true)

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
        setLoading(false)
        setError(false)
        setSuccess(true)
      })
      .catch(err => {
        setLoading(false)
        setError(true)
        setSuccess(false)
      })

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
              error ? (
                <Alert status="error" mb='4'>
                  <AlertIcon />
                  <AlertTitle mr={2}>Something went wrong while submitting your review</AlertTitle>
                  <CloseButton
                    position="absolute"
                    right="8px" top="8px"
                    onClick={() => setError(false)}
                  />
                </Alert>
              ) : <></>
            }

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
              isLoading={loading}
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