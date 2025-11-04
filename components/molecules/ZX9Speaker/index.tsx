import React from 'react'
import { Box, Heading, Image, Text, Button, Stack } from '@chakra-ui/react'
import Link from 'next/link'

import FadeInOnScroll from '@/components/organisms/FadeInOnScroll'

const ZX9Speaker = (): React.JSX.Element => {
  return (
    <FadeInOnScroll>
      <Stack
        textAlign={{ base: 'center', lg: 'left' }}
        direction={{ base: 'column', lg: 'row' }}
        gap={{ lg: '8.625rem' }}
        px={{ base: '1.5rem', sm: '3rem', lg: '6rem' }}
        py={{ base: '3.4375rem', sm: '4rem', lg: '6rem' }}
        borderRadius="0.5rem"
        background="url(/images/home/desktop/pattern-circles.svg) no-repeat"
        backgroundSize="cover"
        backgroundPosition={{
          base: '50% -8.125rem',
          md: '50% -16.125rem',
          lg: '-15rem -9.125rem',
        }}
        backgroundColor="accent"
        overflow="hidden"
        align={{ lg: 'center' }}
      >
        <picture>
          <source
            media="(min-width: 62em)"
            srcSet="/images/home/desktop/image-speaker-zx9.png"
          />
          <source
            media="(min-width: 30em)"
            srcSet="/images/home/tablet/image-speaker-zx9.png"
          />
          <Image
            width={['10.625rem', '12.3125rem', null, '25.625rem']}
            src="/images/home/mobile/image-speaker-zx9.png"
            objectFit="cover"
            mb={{ base: '2rem', lg: 0 }}
            ml={{ base: 'auto', lg: '7.3125rem' }}
            mr={['auto']}
            position="relative"
            top={{ lg: '.8rem' }}
            alt=""
          />
        </picture>
        <Box ml={{ lg: '8.625rem' }} marginInlineStart="0" pt={{ lg: '2rem' }}>
          <Heading
            as="h2"
            color="white"
            maxWidth={['10ch']}
            mx={{ base: 'auto', lg: 'unset' }}
            mb="1.5rem"
            fontSize={['2.25rem', '3.5rem']}
            letterSpacing={['0.0806em', '0.125em']}
            lineHeight="1"
          >
            ZX9 Speaker
          </Heading>
          <Text
            color="rgba(255,255,255, 0.75)"
            maxWidth={['30ch', '42ch', null, '38ch']}
            mx={{ base: 'auto', lg: 'unset' }}
            mb={{ base: '4.0625rem', lg: '2.5rem' }}
            fontSize="0.9375rem"
            fontWeight="thin"
            lineHeight="1.56"
          >
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </Text>
          <Link href="/speakers/zx9-speaker">
            {/* @ts-expect-error - Custom recipe variant */}
            <Button 
              variant="primary"
              bg="black" 
              _hover={{ bg: '#4C4C4C' }}
              className="px-10 py-[1.125rem]"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
            >
              See Product
            </Button>
          </Link>
        </Box>
      </Stack>
    </FadeInOnScroll>
  )
}

export default ZX9Speaker
