import React, { Component } from "react";
import Head from 'next/head';
import {
  Container,
  Box,
  Heading,
  Icon,
  Form,
} from '@chakra-ui/react';
import { BsPersonFill } from "react-icons/bs";

class Login extends Component {
  render() {
    return (
      <>
        <Head>
          <title>Login - GPSTrails</title>
        </Head>

        <Container
          pt='7'
          pb='7'
        >
          <Box borderWidth='thin' rounded='md' p='5'>
            <Heading size='lg' textAlign='center'>
              <Icon as={BsPersonFill} mr='2' />
              Login
            </Heading>

            <Form>

            </Form>
          </Box>
        </Container>
      </>
    )
  }
}

export default Login