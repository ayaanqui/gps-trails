import Head from 'next/head'
import Image from 'next/image'
import { Container, Heading, Box, Text, Flex } from "@chakra-ui/react"
import { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

class Home extends Component {
  state = {
    lat: 41.9333071,
    lon: -88.0900673,
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState({ lat: coords.latitude, lon: coords.longitude })
      console.log(`(${this.state.lat}, ${this.state.lon})`);
    });
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken:
        'pk.eyJ1IjoiYXlhYW5xdWkiLCJhIjoiY2tsNnRheWQ5MmVibzJvdWk3azJ0dm92ciJ9.Jt8MpRok1WY9aV3Yf26gRQ'
    });

    return (
      <>
        <Head>
          <title>GPS Trails</title>
        </Head>

        <Container maxWidth='full' w='full' h='100vh' overflow='hidden' p='0'>
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '100vh',
              width: '100%'
            }}
            center={[this.state.lon, this.state.lat]}
          >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
              <Feature coordinates={[this.state.lon, this.state.lat]} />
            </Layer>
          </Map>;
        </Container>
      </>
    )
  }
}

export default Home
