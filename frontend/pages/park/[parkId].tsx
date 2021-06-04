import { useEffect, useState } from "react"
import {
  Container,
  Heading,
  Flex,
  Icon,
  Spinner,
} from '@chakra-ui/react'
import Head from "next/head"
import router from 'next/router'
import api from "../../util/api"
import axios from 'axios'
import Park from "../../types/Park"
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
  const [error, setError] = useState(false)
  const [park, setPark] = useState(new P())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const parkId = router.query['parkId']
    axios.get(`${api.parks}${parkId}`)
      .then(({ data }) => {
        setError(false)
        setPark(data)
        setLoading(false)
      })
      .catch(err => {
        setError(true)
        setLoading(false)
      })
  })

  const renderPark = () => {
    return (
      error ? (
        <Flex p='3' alignItems='center' justifyContent='center' direction='column' maxW='inherit' h='inherit'>
          <Icon as={FcHighPriority} boxSize='20' mb='7' />
          <Heading textAlign='center'>Park not found</Heading>
        </Flex>
      ) : (
        <ParkDetailed park={park} />
      )
    )
  }

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
            {
              error ? (
                <></>
              ) : (
                  <Map
                    lat={park.lat}
                    lon={park.lon}
                  />
              )
            }
          </Container>
        </Flex>
      </Container>
    </>
  )
}