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

class Park extends Component {
  state: {
    park: P.default | undefined,
  } = {
      park: undefined
    }

  componentDidMount() {
    const id = Router.query.id

    if (!id)
      return

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

    return (
      <>
        <Head>
          <title>{this.state.park?.name}</title>
        </Head>

        <Container maxW='full' h='100vh' p='0' m='0'>
          <Flex direction='row' justifyContent='space-between'>
            <Container flex='1' maxW='full' p='0'>
              <Image w='full' src={`${api.static}${this.state.park?.image}`} />
              <Box p='2'>
                <Heading mb='3'>{this.state.park?.name}</Heading>
                <Text>
                  {this.state.park?.description}
                </Text>
              </Box>
            </Container>

            <Container flex='2' p='0' maxW='full' h='100vh' bg='gray.400'>
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: '100vh',
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