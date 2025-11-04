'use client'

import {
  Box,
  Stack,
  Heading,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'
import { IncludedItem } from '@/models/Product'

type ProductFeaturesProps = {
  features: string | undefined
  includedItems: IncludedItem[] | undefined
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  features,
  includedItems,
}): React.JSX.Element => {
  return (
    <Stack
      mt={{ base: '5.5rem', sm: '7.5rem', lg: '10rem' }}
      gap={{ base: '5.5rem', lg: '7.5rem' }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Box flexBasis={{ lg: '55%' }}>
        <Heading fontSize={{ base: '1.5rem', md: '2rem' }}>Features</Heading>
        <Text mt={{ base: '1.5rem' }} whiteSpace="pre-line">
          {features}
        </Text>
      </Box>
      <Stack
        direction={{ base: 'column', sm: 'row', lg: 'column' }}
        gap={{ base: '1.5rem', sm: '6rem', md: '12rem', lg: '2rem' }}
      >
        <Heading fontSize={{ base: '1.5rem', md: '2rem' }}>In the Box</Heading>
        <Stack as="ul" mt={{ base: '1.5rem' }} gap="0.5rem" listStyleType="none">
          {includedItems?.map(item => (
            <Box as="li" key={item.item} fontSize="0.9375rem">
              <SimpleGrid gridTemplateColumns="2rem 1fr">
                <Box as="span" color="accent" fontWeight="bold">
                  {item.quantity}x
                </Box>
                <Box
                  as="span"
                  color="text"
                  textTransform="capitalize"
                  textAlign="left"
                >
                  {item.item}
                </Box>
              </SimpleGrid>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProductFeatures
