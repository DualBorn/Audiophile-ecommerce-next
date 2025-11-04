import React from 'react'
import { Stack, Box } from '@chakra-ui/react'
import Link from 'next/link'

import { links } from '@/lib/links'

const FooterLinks = (): React.JSX.Element => {
  return (
    <Stack
      as="ul"
      gap={{ base: '1rem', md: '2.125rem' }}
      direction={{ base: 'column', sm: 'row' }}
      align={{ base: 'center', md: 'flex-start' }}
      textAlign={{ base: 'center', md: 'right' }}
    >
      {links.map(link => (
        <Box
          as="li"
          fontSize="0.8125rem"
          fontWeight="bold"
          _hover={{ color: 'accent' }}
          transition="color 0.2s linear"
          letterSpacing="0.125rem"
          key={link.id}
          color="white"
          textTransform="uppercase"
        >
          <Link
            href={link.url}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {link.text}
          </Link>
        </Box>
      ))}
    </Stack>
  )
}

export default FooterLinks
