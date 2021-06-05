import Head from 'next/head'
import Image from 'next/image'
import {
  Container,
  Heading,
  Flex,
  Spinner,
  Button,
  Icon
} from "@chakra-ui/react"
import { Component, ReactEventHandler } from 'react'
import styles from './home.module.css'
import axios from 'axios'
import api from '../util/api'
import Park from '../types/Park'
import ParkList from '../components/ParkList'
import InfiniteScroll from 'react-infinite-scroll-component'

class Home extends Component {

  limit = 20

  state = {
    lat: 41.9333071,
    lon: -88.0900673,
    parks: Array<Park>(),
    loading: true,
    page: 1,
    hasMore: true,
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState({ lat: coords.latitude, lon: coords.longitude })
    })

    this.fetchParks(1)
  }

  fetchParks(page: number) {
    axios.get(`${api.parks}?limit=${this.limit}&page=${page}`)
      .then(({ status, data }: { status: number, data: Array<Park> }) => {
        if (data.length === 0) {
          this.setState({ loading: false, hasMore: false })
          return
        }

        this.setState({ parks: [...this.state.parks, ...data], loading: false })
      })
      .catch(err => this.setState({ loading: false, hasMore: false }))
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
            mt='-7em' mb='32'
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
                  <InfiniteScroll
                    dataLength={this.state.parks.length}
                    next={() => {
                      this.setState({ page: this.state.page + 1 })
                      this.fetchParks(this.state.page)
                    }}
                    hasMore={this.state.hasMore}
                    loader={
                      <Flex alignItems='center' p='10' justifyContent='center' maxW='inherit' minH='inherit'>
                        <Spinner size='md' />
                      </Flex>
                    }
                  >
                    <ParkList parks={this.state.parks} />
                  </InfiniteScroll>
              )
            }
          </Container>
        </Container>
      </>
    )
  }
}

export default Home
