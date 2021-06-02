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
import { validateEmail } from "../../util/validations";

class Register extends Component {
  state: {
    loading: boolean,
    showPassword: boolean,
    errors: boolean,
    signedUp: boolean
  } = {
      loading: false,
      showPassword: false,
      errors: false,
      signedUp: false,
    }

  async validateEmail(email: string): Promise<string> {
    return await validateEmail(email, false, 'Email is in use by another account')
  }

  validateName(name: string): string {
    if (!name) {
      return "Name is required"
    }
    return ''
  }

  validatePassword(password: string): string {
    if (!password) {
      return "Password is required"
    }
    return ''
  }

  handleLogin({ email, name, password }: { email: string, name: string, password: string }) {
    this.setState({ loading: true, showPassword: false })

    axios.post<{ email: string, name: string, password: string }, any>(
      api.register,
      { email, name, password }
    )
      .then(({ status, data }) => {
        this.setState({
          loading: false,
          signedUp: true,
          errors: false,
        })
      })
      .catch(err => {
        this.setState({ loading: false, signedUp: false, errors: true })
      })
  }

  renderErrorStatus() {
    return (
      <Alert status="error" mb='2'>
        <AlertIcon />
        <AlertTitle mr={2}>Could not create account</AlertTitle>
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
        <AlertTitle>Account Created!</AlertTitle>
        <AlertDescription>You can now login</AlertDescription>
      </Alert>
    )
  }

  render() {
    return (
      <>
        <Head>
          <title>Sign up - GPSTrails</title>
        </Head>

        <Container
          pt='7'
          pb='7'
          mt='5' mb='5'
          maxW='md'
        >
          <Box shadow='md' borderWidth='thin' rounded='md' p='5'>
            <Heading size='lg' textAlign='center' mb='5'>
              Create Account
            </Heading>

            {this.state.errors ? this.renderErrorStatus() : null}

            {this.state.signedUp ? this.renderSuccessStatus() : null}

            <Formik
              initialValues={{ email: '', name: '', password: '' }}
              onSubmit={(values: { email: string, name: string, password: string }) => this.handleLogin(values)}
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

                  <Field name="name" validate={this.validateName}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        mb='5'
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input {...field} id="name" placeholder="John Doe" type='text' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={this.validatePassword}>
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
                    Sign Up
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

export default Register