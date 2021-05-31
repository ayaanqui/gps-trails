import {
  Flex,
  Container,
  Image,
  Text,
  Link,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Box
} from '@chakra-ui/react'
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'

export default function Navbar() {
  const h = '32px';
  const shadowSize = 'lg';

  return (
    <Container
      maxW='full' height='50px'
      pos='fixed'
      top='0' left='0'
      pt='1' pb='1'
      pl='5' pr='5'
    >
      <Flex direction='row' maxW='full' h='full' alignItems='center' justifyContent='space-between'>
        <Flex direction='row' alignItems='center' justifyContent='start'>
          <Link href='/'>
            <Image
              src='/img/profile-square.png'
              maxWidth={h}
              alt='Logo'
              shadow={shadowSize}
              borderRadius='lg'
            />
          </Link>

          <InputGroup ml='7px'>
            <InputLeftElement h={h} children={<SearchIcon color="gray.300" w='5' />} />
            <Input
              variant='filled'
              placeholder="Search for trails"
              h={h}
              shadow={shadowSize}
              bg='white'
            />
            {/* <InputRightElement h={h} children={<Spinner color="gray.500" size="sm" />} /> */}
          </InputGroup>

          <Box ml='5'>
            <Menu>
              <MenuButton
                h={h}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                shadow={shadowSize}
              >
                Home
              </MenuButton>
              <MenuList>
                <MenuItem>Explore</MenuItem>
                <MenuItem>Add trail</MenuItem>
                <MenuItem>About</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

        <Flex>
          <Button size='sm' variant='outline' mr='2' h={h} shadow={shadowSize}>Login</Button>
          <Button size='sm' h={h} colorScheme='blue' color='white' shadow={shadowSize}>Sign up</Button>
        </Flex>
      </Flex>
    </Container>
  )
}