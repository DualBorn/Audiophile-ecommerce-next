'use client'

import React from 'react'
import { Box, Container, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Hero = (): React.JSX.Element => {
  return (
    <Box
      position="relative"
      bg="black"
      zIndex="1"
      overflow="hidden"
      pt={{ base: '6rem', sm: '8rem', lg: '10rem' }}
      pb="7rem"
      textAlign={{ base: 'center', lg: 'left' }}
      borderTop="none"
      borderBottom="none"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        style={{ position: 'absolute', width: '100%', height: '116%', top: '-6rem', left: 0, zIndex: -1 }}
      >
        <Box
          _after={{
            content: "''",
            position: 'absolute',
            background:
              "url('/images/home/mobile/image-hero.jpg') center center/cover no-repeat",
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            '@media screen and (min-width: 30em)': {
              background:
                "url('/images/home/tablet/image-hero.jpg') center center/contain no-repeat",
              left: 0,
              transform: 'translateX(0)',
            },
            '@media screen and (min-width: 62em)': {
              background:
                "url('/images/home/desktop/image-hero.jpg') center/contain no-repeat",
            },
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 1.5,
            duration: 2,
          },
        }}
      >
        <Container
          maxW="container.lg"
          px={6}
          mx="auto"
        >
        <Heading
          as="h1"
          fontSize={['2.25rem', '3.5rem']}
          color="white"
          maxWidth="15ch"
          mx={{ base: 'auto', lg: 0 }}
          mb={6}
          letterSpacing="0.0806rem"
          lineHeight="1.1"
        >
          <Box
            as="strong"
            color="textLight"
            textTransform="uppercase"
            mb={4}
            letterSpacing="0.625rem"
            display="block"
            fontSize="0.875rem"
          >
            New Product
          </Box>
          XX99 Mark II Headphones
        </Heading>
        <Text
          color="textLight"
          fontSize="0.9375rem"
          maxWidth="38ch"
          mx={{ base: 'auto', lg: 0 }}
          mb={10}
          lineHeight="1.7"
        >
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </Text>
        <Link href="/headphones/xx99-mark-two-headphones">
          {/* @ts-expect-error - Custom recipe variant */}
          <Button 
            cursor="pointer" 
            variant="primary" 
            as="button"
            className="px-10 py-[1.125rem]"
            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
          >
            See Product
          </Button>
        </Link>
        </Container>
      </motion.div>
    </Box>
  )
}

export default Hero
