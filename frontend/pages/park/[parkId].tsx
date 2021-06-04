import { Component, useEffect, useState } from "react"
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
import router from 'next/router'
import api, { mapboxApiKey } from "../../util/api"
import axios from 'axios'
import Park from "../../types/Park"
import 'mapbox-gl/dist/mapbox-gl.css'
import styles from '../../styles/ParkPage.module.css'
import ParkDetailed from "../../components/ParkDetailed"
import { FcHighPriority } from 'react-icons/fc'
import Map from "../../components/Map"

class P implements Park {
  id: number = 0
  name: string = ''
  image: string = ''
  description: string = ''
  lat: number = 0
  lon: number = 0
  parkArea: number = 0
  views: number = 0
  ratingsAvg: number = 0
  contact: string = ''
  location: string = ''
}

export default function ParkPage() {
  const [park, setPark] = useState(new P())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const parkId = router.query['parkId']
    axios.get(`${api.parks}${parkId}`)
      .then(({ data }) => {
        setPark(data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  })

  const renderPark = () => {
    return (
      park ? (
        <ParkDetailed park={park} />
      ) : (
        <Flex alignItems='center' justifyContent='center' direction='column' maxW='inherit' h='inherit'>
          <Icon as={FcHighPriority} boxSize='20' mb='7' />
          <Heading>Park not found</Heading>
        </Flex>
      )
    )
  }

  const coords = [park.lon, park.lat]

  return (
    <>
      <Head>
        <title>{park?.name}</title>
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
              loading ? (
                <Flex alignItems='center' justifyContent='center' maxW='inherit' h='inherit'>
                  <Spinner size='lg' />
                </Flex>
              ) : renderPark()
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
              lat={park.lat}
              lon={park.lon}
            />
          </Container>
        </Flex>
      </Container>
    </>
  )
}