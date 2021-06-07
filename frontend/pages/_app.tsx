import type { AppProps } from 'next/app'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

import '../styles/globals.css'
import { login, authStore, logout } from '../store/authStore';
import { useEffect } from 'react';
import axios from 'axios';
import api from '../util/api';
import User from '../types/User';
import Head from 'next/head';

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
        authStore.dispatch(logout())
        console.log('You were logged out!')
      })
  })

  return (
    <ChakraProvider>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <Container h='50px' maxW='full'>
        <Navbar />
      </Container>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
