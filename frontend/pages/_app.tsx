import type { AppProps } from 'next/app'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

import '../styles/globals.css'
import { login, authStore } from '../store/authStore';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    authStore.dispatch(login())
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
