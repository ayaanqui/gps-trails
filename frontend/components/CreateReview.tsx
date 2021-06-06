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
import React from 'react';
import Park from '../types/Park';
import { useState } from 'react';
import axios from 'axios';
import api from '../util/api';
import { authStore } from '../store/authStore';
import StarRating from 'react-star-ratings'

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
        setRating(0)
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

            <StarRating
              rating={rating}
              changeRating={setRating}
              starRatedColor='rgb(236,201,75)'
              starHoverColor='rgb(236,201,75)'
            />

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