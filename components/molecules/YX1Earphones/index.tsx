import React from 'react'
import { Box, Heading, Image, Button, SimpleGrid } from '@chakra-ui/react'
import Link from 'next/link'

import FadeInOnScroll from '@/components/organisms/FadeInOnScroll'

const YX1Earphones = (): React.JSX.Element => {
  return (
    <SimpleGrid
      columns={[1, 2]}
      gap={{ base: '1.5rem', sm: '1rem', md: '0.75rem', lg: '1.875rem' }}
    >
      <FadeInOnScroll>
        <Box as="picture" height="100%">
          <source
            media="(min-width: 62em)"
            srcSet="/images/home/desktop/image-earphones-yx1.jpg"
          />
          <source
            media="(min-width: 30em)"
            srcSet="/images/home/tablet/image-earphones-yx1.jpg"
          />
          <Image
            src="/images/home/mobile/image-earphones-yx1.jpg"
            objectFit="cover"
            borderRadius="0.5rem"
            alt=""
          />
        </Box>
      </FadeInOnScroll>
      <FadeInOnScroll transition={{ ease: 'easeOut', duration: 1, delay: 0.5 }}>
        <Box
          bg="gray"
          height="100%"
          py={{ base: '2.5625rem', sm: 'unset' }}
          pl={{
            base: '1.5rem',
            sm: '2rem',
            md: '2.5625rem',
            lg: '5.9375rem',
          }}
          borderRadius="0.5rem"
          position="relative"
        >
          <Box
            position={{ sm: 'absolute' }}
            top="50%"
            transform={['translateY(0)', 'translateY(-50%)']}
            pr={{ sm: '1rem' }}
          >
            <Heading as="h2" mb="2rem" fontSize="1.75rem" color="black">
              YX1 Earphones
            </Heading>
            <Link href="/earphones/yx1-earphones">
              {/* @ts-expect-error - Custom recipe variant */}
              <Button 
                variant="secondary"
                className="px-10 py-[1.125rem]"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
              >
                See Product
              </Button>
            </Link>
          </Box>
        </Box>
      </FadeInOnScroll>
    </SimpleGrid>
  )
}

export default YX1Earphones
