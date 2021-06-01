import React, { Component } from "react";
import Head from 'next/head';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputRightElement,
  InputGroup,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { Field, Form, Formik } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";
import api from "../../util/api";

class Login extends Component {
  state: {
    loading: boolean,
    user: { name: string, email: string, id: number } | null,
    token: string,
    showPassword: boolean,
    errors: boolean,
    loggedIn: boolean
  } = {
      loading: false,
      user: null,
      token: '',
      showPassword: false,
      errors: false,
      loggedIn: false,
    }

  validateEmail(value: string): string {
    let error: string = ''
    if (!value) {
      error = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Email is invalid"
    }
    return error
  }

  handleLogin({ email, password }: { email: string, password: string }) {
    this.setState({ loading: true, showPassword: false })

    axios.post<{ email: string, password: string }, any>(
      api.login,
      { email, password }
    )
      .then(({ status, data }) => {
        console.log(data)
        this.setState({
          loading: false,
          loggedIn: true,
          errors: false,
          user: data.user,
          token: data.access_token
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false, loggedIn: false, errors: true })
      })
  }

  renderErrorStatus() {
    return (
      <Alert status="error" mb='2'>
        <AlertIcon />
        <AlertTitle mr={2}>Incorrect email or password</AlertTitle>
        <CloseButton
          position="absolute"
          right="8px" top="8px"
          onClick={() => this.setState({ errors: false })}
        />
      </Alert>
    )
  }

  renderSuccessStatus() {
    return (
      <Alert status='success' mb='2'>
        <AlertIcon />
        <AlertTitle>Logged In!</AlertTitle>
        <AlertDescription>Welcome back, {this.state.user?.name}</AlertDescription>
      </Alert>
    )
  }

  render() {
    return (
      <>
        <Head>
          <title>Login - GPSTrails</title>
        </Head>

        <Container
          pt='7'
          pb='7'
          mt='5' mb='5'
          maxW='md'
        >
          <Box shadow='md' borderWidth='thin' rounded='md' p='5'>
            <Heading size='lg' textAlign='center' mb='5'>
              Login
            </Heading>

            {this.state.errors ? this.renderErrorStatus() : null}

            {this.state.loggedIn ? this.renderSuccessStatus() : null}

            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values: { email: string, password: string }) => this.handleLogin(values)}
            >
              {(props) => (
                <Form>
                  <Field name="email" validate={this.validateEmail}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        mb='5'
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} id="email" placeholder="Ex. johndoe@email.com" type='email' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={null}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.touched.passowrd}>
                        <FormLabel htmlFor="passowrd">Password</FormLabel>
                        <InputGroup size='md'>
                          <Input
                            {...field}
                            id="passowrd"
                            placeholder="Password"
                            pr="3rem"
                            type={this.state.showPassword ? "text" : "password"}
                          />
                          <InputRightElement width='3rem'>
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                              variant='ghost'
                            >
                              <Icon
                                as={this.state.showPassword ? BsEyeSlash : BsEye}
                              />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.passowrd}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    mt={5}
                    colorScheme="blue"
                    isLoading={this.state.loading}
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </>
    )
  }
}

export default Login