import type { AppProps } from 'next/app'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

import '../styles/globals.css'
import { login, authStore } from '../store/authStore';
import { useEffect } from 'react';
import axios from 'axios';
import api from '../util/api';
import User from '../types/User';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken || accessToken.trim() === '')
      return

    axios.get(api.verify, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
      .then(({ data }: { data: User }) => {
        authStore.dispatch(login({
          accessToken: accessToken,
          user: data
        }))
      })
      .catch(err => {
        throw err
      })
  })

  return (
    <ChakraProvider>
      <Container h='50px' maxW='full'>
        <Navbar />
      </Container>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
