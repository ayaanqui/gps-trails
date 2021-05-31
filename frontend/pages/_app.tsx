import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Container } from '@chakra-ui/react';
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Container mb='10px' minHeight='50px' maxWidth='full'>
        <Navbar />
      </Container>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
