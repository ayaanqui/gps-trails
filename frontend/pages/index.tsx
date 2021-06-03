import Head from 'next/head'
import Image from 'next/image'
import { Container, Heading, Flex } from "@chakra-ui/react"
import { Component } from 'react'
import styles from './home.module.css'
import axios from 'axios'
import api from '../util/api'
import Park from '../types/Park'
import ParkList from '../components/ParkList'
import { Spinner } from "@chakra-ui/react"

class Home extends Component {

  state = {
    lat: 41.9333071,
    lon: -88.0900673,
    parks: Array<Park>(),
    loading: true
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState({ lat: coords.latitude, lon: coords.longitude })
    });

    axios.get(api.parks)
      .then(({ status, data }: { status: number, data: Array<Park> }) => {
        this.setState({ parks: data, loading: false })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <Head>
          <title>GPS Trails</title>
        </Head>

        <Container maxWidth='full' w='full' p='0'>
          <Flex
            className={styles.findYourTrailHero}
            maxW='full'
            height='40vh'
            alignItems='center'
            justifyContent='center'
            direction='column'
          >
            <Heading size='2xl'>Find Your Trail</Heading>
          </Flex>

          <Container
            bg='white'
            maxW='4xl'
            mt='-7em'
            borderRadius='lg'
            minH='50vh'
            shadow='md'
            p='0'
          >
            {
              this.state.loading ? (
                <Flex alignItems='center' justifyContent='center' maxW='inherit' minH='inherit'>
                  <Spinner size='lg' />
                </Flex>
              ) : (
                  <ParkList parks={this.state.parks} />
              )
            }
          </Container>
        </Container>
      </>
    )
  }
}

export default Home
