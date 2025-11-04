import React from 'react'
import { Container } from '@chakra-ui/react'

import Hero from '@/components/organisms/Hero'
import CategoriesLinks from '@/components/organisms/CategoriesLinks'
import MainGallery from '@/components/organisms/MainGallery'
import AnimatedBestGear from '@/components/molecules/AnimatedBestGear'

const HomePage = (): React.JSX.Element => {
  return (
    <main id="main" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Hero />
      <Container maxW="container.lg" px={{ base: 6, sm: 8, lg: 6 }} mx="auto">
        <CategoriesLinks />
        <MainGallery />
        <AnimatedBestGear />
      </Container>
    </main>
  )
}

export default HomePage
