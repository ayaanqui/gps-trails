import { Component } from "react"
import {
  Container,
  Heading,
  Flex,
  Image,
  Text,
  Box,
  Icon,
} from '@chakra-ui/react'
import Head from "next/head"
import Router from 'next/router'
import api from "../../util/api"
import axios from 'axios'
import * as P from "../../types/Park"
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import styles from '../../styles/ParkPage.module.css'
import { getStars } from '../../util/stars';
import { numFormat } from "../../util/formatters"

class Park extends Component {
  state: {
    park: P.default | undefined,
  } = {
      park: undefined
    }

  componentDidMount() {
    const id = Router.query.id

    console.log(id)

    axios.get(`${api.parks}${id}`)
      .then(({ data }) => {
        this.setState({ park: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken:
        'pk.eyJ1IjoiYXlhYW5xdWkiLCJhIjoiY2tsNnRheWQ5MmVibzJvdWk3azJ0dm92ciJ9.Jt8MpRok1WY9aV3Yf26gRQ'
    });

    const lat = this.state.park?.lat ? this.state.park.lat : 0
    const lon = this.state.park?.lon ? this.state.park.lon : 0
    const ratingsAvg = this.state.park?.ratingsAvg ? this.state.park.ratingsAvg : 0
    const parkArea = this.state.park?.parkArea ? this.state.park.parkArea : 0

    return (
      <>
        <Head>
          <title>{this.state.park?.name}</title>
        </Head>

        <Container
          maxW='full'
          p='0'
          m='0'
          className={styles.parkContainer}
        >
          <Flex direction='row' h='inherit' justifyContent='space-between'>
            <Container flex='1' h='inherit' maxW='full' p='0' overflowY='auto'>
              <Image w='full' src={`${api.static}${this.state.park?.image}`} />

              <Box p='3' mb='7'>
                <Heading mb='2'>{this.state.park?.name}</Heading>
                <Flex
                  size='xs'
                  color='gray.500'
                  mb='2'
                  direction='row'
                  justifyContent='space-between'
                >
                  <Text mr='4' display='flex' alignItems='center'>
                    <Icon
                      as={FaMapMarkerAlt}
                      mr='1'
                    />
                    {this.state.park?.location}
                  </Text>

                  <Text>{numFormat(parkArea)} acres</Text>
                </Flex>
                <Box mb='7'>
                  {getStars(ratingsAvg, '6').map(star => star)}
                </Box>
                <Text>
                  {this.state.park?.description}
                </Text>
              </Box>

              <Box p='3' mb='7'>
                <Heading size='md'>
                  Reviews (11)
                </Heading>
              </Box>
            </Container>

            <Container
              flex='2'
              p='0'
              maxW='full'
              bg='gray.400'
              className={styles.parkContainer}
            >
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: 'inherit',
                  width: '100%'
                }}
                center={[lon, lat]}
              >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                  <Feature coordinates={[lon, lat]} />
                </Layer>
                <Marker
                  anchor='center'
                  coordinates={[lon, lat]}
                >
                  <Icon
                    as={FaMapMarkerAlt}
                    color='red.400'
                    boxSize='12'
                  />
                </Marker>
              </Map>
            </Container>
          </Flex>
        </Container>
      </>
    )
  }
}

export default Park