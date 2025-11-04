'use client'

import { HStack, Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { links } from '@/lib/links'

const NavLinks = (): ReactElement => {
  const pathname = usePathname()

  return (
    <Box as="nav" display={{ base: 'none', lg: 'block' }}>
      <HStack as="ul" display="flex" spacing={{ base: 8, lg: '2.5rem' }} listStyleType="none">
        {links.map(link => {
          const isActive = pathname === link.url
          return (
            <Box
              as="li"
              fontSize="sm"
              fontWeight="bold"
              _hover={{ color: 'accent' }}
              transition="color 0.2s linear"
              letterSpacing="0.125em"
              key={link.id}
              color={isActive ? 'accent' : 'white'}
              textTransform="uppercase"
            >
              <Link
                href={link.url}
                aria-current={isActive ? 'page' : undefined}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {link.text}
              </Link>
            </Box>
          )
        })}
      </HStack>
    </Box>
  )
}

export default NavLinks
