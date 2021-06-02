import {
  Flex,
  Container,
  Image,
  Link,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Box
} from '@chakra-ui/react'
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { authStore, login, logout } from '../store/authStore';
import { Component } from 'react';
import User from '../types/User';

class Navbar extends Component {
  h = '32px';
  state: {
    loggedIn: boolean,
    user: User | undefined,
  } = {
      loggedIn: false,
      user: undefined
    }

  componentDidMount() {
    authStore.subscribe(() => {
      const { loggedIn, user } = authStore.getState()
      this.setState({ loggedIn, user })
    })
  }

  sideNav() {
    if (this.state.loggedIn) {
      return (
        <Menu>
          <MenuButton
            h={this.h}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant='outlined'
          >
            {this.state.user?.name}
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem
              onClick={() => {
                authStore.dispatch(logout())
                this.setState({ loggedIn: false })
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )
    }
    return (
      <>
        <NextLink href='/login' passHref>
          <Link>
            <Button
              size='sm'
              variant='outline'
              mr='2'
              h={this.h}
            >
              Login
            </Button>
          </Link>
        </NextLink>

        <NextLink href='/register' passHref>
          <Link>
            <Button
              size='sm'
              h={this.h}
              colorScheme='blue'
              color='white'
            >
              Sign up
            </Button>
          </Link>
        </NextLink>
      </>
    )
  }

  render() {
    return (
    <Container
      maxW='full' height='50px'
      pos='fixed'
      top='0' left='0'
      pt='1' pb='1'
      pl='5' pr='5'
      zIndex='1000'
      bg='white'
      shadow='sm'
    >
      <Flex direction='row' maxW='full' h='full' alignItems='center' justifyContent='space-between'>
        <Flex direction='row' alignItems='center' justifyContent='start'>

          <NextLink href={'/'} passHref>
            <Link>
              <Image
                src='/img/profile-square.png'
                  maxWidth={this.h}
                alt='Logo'
                borderRadius='lg'
              />
            </Link>
          </NextLink>

          <InputGroup ml='7px'>
              <InputLeftElement h={this.h} children={<SearchIcon color="gray.400" w='5' />} />
            <Input
              variant='filled'
              placeholder="Search for trails"
                h={this.h}
              autoFocus
            />
              {/* <InputRightElement h={this.h} children={<Spinner color="gray.500" size="sm" />} /> */}
          </InputGroup>

          <Box ml='5'>
            <Menu>
              <MenuButton
                  h={this.h}
                as={Button}
                rightIcon={<ChevronDownIcon />}
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
            {this.sideNav()}
        </Flex>
      </Flex>
    </Container>
    )
  }
}

export default Navbar