import React from 'react'
import { Box, Container, Text, Stack, Flex } from '@chakra-ui/react'

import Logo from '@/components/atoms/Logo'
import FooterLinks from '@/components/molecules/FooterLinks'
import SocialLinks from '@/components/molecules/SocialLinks'

const Footer = (): React.JSX.Element => {
  return (
    <Box
      as="footer"
      mt={['7.5rem', '6rem', '12.5rem']}
      bg="black"
      textAlign={{ base: 'center', sm: 'left' }}
      position="relative"
    >
      <Container
        pt={{ base: '3.25rem', sm: '3.75rem', lg: '4.6875rem' }}
        pb={{ base: '3rem', lg: '3rem' }}
        maxW="container.lg"
        position="relative"
        px={6}
        mx="auto"
        _before={{
          content: '""',
          position: 'absolute',
          height: '0.25rem',
          width: '6.25rem',
          bg: 'accent',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          '@media screen and (min-width: 30em)': {
            transform: 'translateX(0)',
            left: '1.5rem',
          },
        }}
      >
        {/* Top Section: Logo and Navigation */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '3rem', md: '2rem' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
          mb={{ base: '3rem', lg: '2rem' }}
        >
          {/* Left: Logo */}
          <Box flex={{ base: '1', md: '0 1 auto' }}>
            <Logo />
          </Box>
          
          {/* Right: Navigation Links */}
          <Box flex={{ base: '1', md: '0 1 auto' }}>
            <FooterLinks />
          </Box>
        </Flex>

        {/* Bottom Section: Description, Copyright, and Social */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '3rem', md: '2rem' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
        >
          {/* Left Column: Description and Copyright */}
          <Box
            flex={{ base: '1', md: '0 1 50%' }}
            width={{ base: '100%', md: 'auto' }}
            maxWidth={{ md: '33.75rem' }}
          >
            <Text
              variant="darkBackground"
              color="rgba(255,255,255,0.5)"
              fontSize="0.9375rem"
              lineHeight="1.66"
              mb={{ base: '3rem', md: '3.5rem', lg: '3.5rem' }}
            >
              Audiophile is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we&apos;re open 7 days a week.
            </Text>
            <Text
              variant="darkBackground"
              color="rgba(255,255,255,0.5)"
              fontSize="0.9375rem"
            >
              Copyright 2025. All Rights Reserved
            </Text>
          </Box>

          {/* Right Column: Social Media Icons */}
          <Box
            flex={{ base: '1', md: '0 1 auto' }}
            alignSelf={{ base: 'center', md: 'flex-start' }}
          >
            <SocialLinks />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
