import React from 'react'
import { VStack } from '@chakra-ui/react'

import YX1Earphones from '@/components/molecules/YX1Earphones'
import ZX7Speaker from '@/components/molecules/ZX7Speaker'
import ZX9Speaker from '@/components/molecules/ZX9Speaker'

const MainGallery = (): React.JSX.Element => {
  return (
    <VStack
      mt={{ base: '7.5rem', sm: '7.5rem', md: '10rem', lg: '12rem' }}
      gap={{ base: '1.5rem', sm: '2rem', lg: '3rem' }}
      align="stretch"
    >
      <ZX9Speaker />
      <ZX7Speaker />
      <YX1Earphones />
    </VStack>
  )
}

export default MainGallery
