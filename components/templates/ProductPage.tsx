'use client'

import { Product } from '@/models/Product'
import { Container, Box } from '@chakra-ui/react'

import ProductDetails from '@/components/organisms/ProductDetails'
import GoBackLink from '@/components/atoms/GoBackLink'

const ProductPage: React.FC<{ product: Product }> = ({
  product,
}): JSX.Element => {
  return (
    <Box as="main" id="main" bg="#ffffff" minH="100vh" py={{ base: '2rem', lg: '4rem' }}>
      <Container maxW="container.lg" px={6} mx="auto">
        <GoBackLink />
        <ProductDetails product={product} />
      </Container>
    </Box>
  )
}

export default ProductPage
