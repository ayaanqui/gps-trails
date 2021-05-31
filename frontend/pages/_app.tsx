import type { AppProps } from 'next/app'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
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
