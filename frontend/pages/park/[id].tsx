import { Component } from "react"
import {
  Container,
  Heading,
  Flex,
  Image,
  Text,
  Box,
  Icon,
  Spinner,
} from '@chakra-ui/react'
import Head from "next/head"
import Router from 'next/router'
import api, { mapboxApiKey } from "../../util/api"
import axios from 'axios'
import * as P from "../../types/Park"
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import styles from '../../styles/ParkPage.module.css'
import ParkDetailed from "../../components/ParkDetailed"
import { FcHighPriority } from 'react-icons/fc'

class Park extends Component {
  state: {
    park: P.default | undefined,
    loading: boolean
  } = {
      park: undefined,
      loading: true
    }

  componentDidMount() {
    const id = Router.query.id

    axios.get(`${api.parks}${id}`)
      .then(({ data }) => {
        this.setState({ park: data, loading: false })
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err)
      })
  }

  renderPark() {
    return (
      this.state.park ? (
        <ParkDetailed park={this.state.park} />
      ) : (
        <Flex alignItems='center' justifyContent='center' direction='column' maxW='inherit' h='inherit'>
          <Icon as={FcHighPriority} boxSize='20' mb='7' />
          <Heading>Park not found</Heading>
        </Flex>
      )
    )
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: mapboxApiKey
    });

    const lat = this.state.park?.lat ? this.state.park.lat : 0
    const lon = this.state.park?.lon ? this.state.park.lon : 0

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
              {
                this.state.loading ? (
                  <Flex alignItems='center' justifyContent='center' maxW='inherit' h='inherit'>
                    <Spinner size='lg' />
                  </Flex>
                ) : this.renderPark()
              }
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