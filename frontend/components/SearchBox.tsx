import {
  InputGroup,
  InputLeftElement,
  Input,
  Link,
  Box,
  Heading,
  Text,
  Flex,
  InputRightElement,
  Spinner,
  Icon,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import axios from 'axios';
import api from '../util/api';
import Park from '../types/Park';
import NextLink from 'next/link';
import { FcFilledFilter } from 'react-icons/fc';

export default function SearchBox({ h }: any) {
  const [parks, setParks] = useState(Array<Park>())
  const [loading, setLoading] = useState(false)
  const [searchBarClicked, setSearchBarClicked] = useState(false)

  const search = (event: any) => {
    const q = event.target.value.trim()

    if (q === '' || q.length < 3) {
      setSearchBarClicked(false)
      return
    }

    setSearchBarClicked(true)
    setLoading(true)
    axios.get(`${api.search}?q=${q}`)
      .then(({ data }) => {
        setLoading(false)
        setParks(data)
      })
      .catch(err => console.log(err))
  }

  const renderParks = () => {
    if (!searchBarClicked)
      return <></>

    if (parks.length === 0) {
      return (
        <Flex alignItems='center' direction='column' justifyContent='center' maxW='inherit' minH='inherit' p='10'>
          <Icon as={FcFilledFilter} mb='5' boxSize='10' />
          <Heading size='md' textAlign='center'>No results found</Heading>
        </Flex>
      )
    }

    return parks.map((park, i) => (
      <Box p='3' key={`searchPark#${i}`} borderBottomWidth='thin'>
        <NextLink href={`/park/${park.id}`} passHref>
          <Link onClick={() => setSearchBarClicked(false)}>
            <Text size='sm'>{park?.name}</Text>
          </Link>
        </NextLink>
      </Box>
    ))
  }

  return (
    <>
      <InputGroup>
        <InputLeftElement h={h} children={<SearchIcon color="gray.400" w='5' />} />
        <Input
          variant='filled'
          placeholder="Search for trails"
          h={h}
          autoFocus
          maxW='500px'
          onKeyUp={search}
        />
        <InputRightElement h={h} children={
          loading ? (
            <Spinner size='sm' color='gray.500' />
          ) : (
            <></>
          )
        } />
      </InputGroup>

      {
        loading ? (
          <></>
        ) : (
            <Box
              position='absolute'
              bg='white'
              shadow='lg'
              w='full'
              maxH='80vh'
              top='50px' left='0'
              rounded='md'
              zIndex={2}
              overflowY='auto' overflowX='hidden'
            >
              {renderParks()}
            </Box>
        )
      }
    </>
  )
}