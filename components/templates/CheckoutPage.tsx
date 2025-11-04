import React from 'react'
import { Container, Box } from '@chakra-ui/react'
import GoBackLink from '@/components/atoms/GoBackLink'
import CheckoutForm from '@/components/organisms/CheckoutForm'

const CheckoutPage = (): React.JSX.Element => {
  return (
    <Box
      as="main"
      id="main"
      bg="#F1F1F1"
      minH="100vh"
      py={{ base: '2rem', lg: '4rem' }}
    >
      <Container maxW="container.lg" px={6} mx="auto">
        <GoBackLink />
        <CheckoutForm />
      </Container>
    </Box>
  )
}

export default CheckoutPage
