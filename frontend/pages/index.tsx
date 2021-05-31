import Head from 'next/head'
import Image from 'next/image'
import { Container, Heading, Box, Text, Flex } from "@chakra-ui/react"

export default function Home() {
  return (
    <Container maxW='3xl' padding='0'>
      <Head>
        <title>GPS Trails</title>
      </Head>

      <Flex padding='5'>
        <Box padding="4" bg="gray.100" maxW="3xl" rounded='lg'>
          <Heading size='xl'>GPS Trails Homepage</Heading>
          <Text>
            There are many benefits to a joint design and development system. Not only
            does it bring benefits to the design team.
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}
