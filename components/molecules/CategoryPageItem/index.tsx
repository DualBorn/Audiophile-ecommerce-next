'use client'

import { Box, Stack, Heading, Text, Button, Image } from '@chakra-ui/react'
import { Product } from '@/models/Product'
import Link from 'next/link'

const CategoryPageItem: React.FC<Product & { index?: number }> = ({
  slug,
  name,
  category,
  description,
  new: isNew,
  categoryImage,
  index = 0,
}): React.JSX.Element => {
  const isEven = index % 2 === 1 // Second item (index 1) should have text on left
  const isEvenIndex = isEven

  return (
    <Stack
      spacing={{ base: '2rem', lg: '0' }}
      direction={{ base: 'column', lg: 'row' }}
      alignItems={{ lg: 'center' }}
    >
      <Box
        flexBasis={{ lg: '55%' }}
        order={{ base: 1, lg: isEvenIndex ? 2 : 1 }}
        mr={{ lg: isEvenIndex ? 0 : '7.8125rem' }}
        ml={{ lg: isEvenIndex ? '7.8125rem' : 0 }}
      >
        <picture>
          <source media="(min-width: 62em)" srcSet={categoryImage.desktop} />
          <source media="(min-width: 30em)" srcSet={categoryImage.tablet} />
          <Image
            src={categoryImage.mobile}
            objectFit="cover"
            width="100%"
            borderRadius="0.5rem"
            alt={name}
          />
        </picture>
      </Box>

      <Box
        textAlign={{ base: 'center', lg: 'left' }}
        flexBasis={{ lg: '45%' }}
        order={{ base: 2, lg: isEvenIndex ? 1 : 2 }}
      >
        <Heading
          as="h2"
          textTransform="uppercase"
          fontSize={{ base: '1.75rem', lg: '2.5rem' }}
          letterSpacing="0.0625rem"
          mb={{ base: '1.5rem' }}
          maxWidth={{ base: '13ch', lg: 'unset' }}
          mx={{ base: 'auto', lg: 'unset' }}
        >
          {isNew && (
            <Box
              as="strong"
              display="block"
              textTransform="uppercase"
              color="accent"
              fontSize="0.875rem"
              letterSpacing="0.625rem"
              fontWeight="normal"
              mb={{ base: '1rem', sm: '1rem', lg: '1rem' }}
            >
              New Product
            </Box>
          )}
          {name}
        </Heading>
        <Text
          mb={{ base: '1.5rem' }}
          px={{ sm: '2rem', md: '4rem', lg: 0 }}
          color="text"
          lineHeight="1.66"
          fontSize="0.9375rem"
        >
          {description}
        </Text>
        <Link href={`/${category}/${slug}`}>
          <Button 
            cursor="pointer" 
            variant="primary"
            className="px-10 py-[1.125rem]"
            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
          >
            See Product
          </Button>
        </Link>
      </Box>
    </Stack>
  )
}

export default CategoryPageItem
