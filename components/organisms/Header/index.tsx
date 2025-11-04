import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import Navbar from '@/components/molecules/Navbar'
import MobileNav from '@/components/molecules/MobileNav'
import SkipLink from '@/components/atoms/SkipLink'

const Header = (): ReactElement => {
  return (
    <Box
      as="header"
      bg="black"
      py={8}
    >
      <SkipLink />
      <Navbar />
      <MobileNav />
    </Box>
  )
}

export default Header
